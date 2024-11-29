import { Injectable, Inject, Logger, BadRequestException } from '@nestjs/common'
// import { UserOptionalDefaults } from '@prism/zod'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import {
    EmailCheckResDto,
    SignupBodyDto,
    SignupResDto,
    SignupResItem,
} from './profile.dto'
import { ResHelperService } from '@src/response-helpers/res-help.service'
import { ENV } from '@src/app.config'
import { hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import type { tokenData } from '@src/utils/jwt-payload.util'
import { Roles } from '@prism/keysley/enums'
import * as moment from 'moment'
import { sendOtpMail } from '@src/utils/send-otp.util'
import { dbUtcFrmt } from '@src/constants/system.constant'
import { Transaction } from 'kysely'
import { DB } from '@prism/keysley/types'

type UserDataType = {
    status: boolean
    first_name: string
    last_name: string
    weight: number | null
    goal_weight: number | null
    height: number | null
    id: number
}

@Injectable()
export class ProfileService {
    private db: DatabaseType
    private logger = new Logger(ProfileService.name)

    constructor(
        @Inject(DatabaseService) database: DatabaseService,
        private rhs: ResHelperService,
        private jwtService: JwtService,
    ) {
        this.db = database.db()
    }

    // Response - true - frontend will show password field after asking for email.
    // Otherwise send verification otp and send response false. Frontend can go to the signup page.
    async checkEmail(email: string): Promise<EmailCheckResDto> {
        const user = await this.db
            .selectFrom('UserEmail')
            .innerJoin('UserEmailOtp', 'UserEmailOtp.email_id', 'UserEmail.id')
            .select([
                'UserEmail.email as email',
                'UserEmail.is_created as is_created',
                'UserEmail.status as status',
                'UserEmailOtp.resend_expire_at as resend',
            ])
            .where('email', '=', email)
            .executeTakeFirst()

        if (user?.is_created) return this.rhs.success(true)

        if (!user || !user.status) {
            await this.createEmailAndSendOtp(email)
            return this.rhs.success(false)
        } else if (!user.is_created) {
            await this.createEmailAndSendOtp(email, user.resend)
            return this.rhs.success(false)
        } else return this.rhs.success(true)
    }

    async createEmailAndSendOtp(email: string, resend?: Date): Promise<void> {
        const currentDate = new Date()
        if (resend && moment(resend, dbUtcFrmt).isAfter(currentDate)) return

        const otp = this.generateOtp()
        const expire_at = moment().add(ENV.OTP_EXPIRY, 'minutes').utc().format(dbUtcFrmt)
        const resend_expire_at = moment()
            .add(ENV.OTP_RESEND_EXPIRY, 'minutes')
            .utc()
            .format(dbUtcFrmt)
        const updated_at = moment().utc().format(dbUtcFrmt)

        await this.db.transaction().execute(async (trx) => {
            const userEmail = { email }
            const dupEmailKey = { status: true, is_created: false, user_id: null }
            const email_id = (
                await trx
                    .insertInto('UserEmail')
                    .values(userEmail)
                    .onDuplicateKeyUpdate(dupEmailKey)
                    .returning('id')
                    .executeTakeFirstOrThrow()
            ).id

            const userOtp = { email_id, otp, expire_at, resend_expire_at }
            const dupOtpKey = { otp, expire_at, updated_at, resend_expire_at }

            await trx
                .insertInto('UserEmailOtp')
                .values(userOtp)
                .onDuplicateKeyUpdate(dupOtpKey)
                .executeTakeFirstOrThrow()

            await sendOtpMail(email, otp)
        })
    }

    generateOtp(): number {
        return Math.floor(100000 + Math.random() * 900000)
    }

    async verifyEmail(email: string, otp: number): Promise<boolean> {
        const currentDate = new Date()
        const isOtpValid = await this.db
            .selectFrom('UserEmail')
            .innerJoin('UserEmailOtp', 'UserEmail.id', 'UserEmailOtp.email_id')
            .select(['UserEmail.id'])
            .where('UserEmail.email', '=', email)
            .where('UserEmailOtp.otp', '=', otp)
            .where('UserEmail.is_created', '=', false)
            .where('UserEmailOtp.expire_at', '>', currentDate)
            .executeTakeFirst()

        if (isOtpValid) return true
        else return false
    }

    async signup(usr: SignupBodyDto): Promise<SignupResDto> {
        const pass_hash = await hash(usr.password, ENV.SALT_ROUNDS)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, otp, ...rest } = usr
        const user = { ...rest, pass_hash }

        const isVerified = await this.verifyEmail(user.email, otp)
        if (!isVerified) throw new BadRequestException('Invalid OTP!')

        let returnData: SignupResItem | null = null
        await this.db.transaction().execute(async (trx) => {
            const userData = await trx
                .insertInto('User')
                .values(user)
                .returning([
                    'id',
                    'first_name',
                    'last_name',
                    'height',
                    'goal_weight',
                    'weight',
                    'status',
                ])
                .executeTakeFirstOrThrow()

            const userRole = { user_id: userData.id, role: Roles.USER }
            await trx.insertInto('UserRole').values(userRole).executeTakeFirstOrThrow()
            await trx
                .updateTable('UserEmail')
                .set({ user_id: userData.id, is_created: true })
                .where('UserEmail.email', '=', user.email)
                .executeTakeFirstOrThrow()

            const [auth_token, refresh_token] = await Promise.all([
                this.createToken(trx, userData, 'auth'),
                this.createToken(trx, userData, 'refresh'),
            ])

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { status, ...returnInfo } = userData
            returnData = { ...returnInfo, auth_token, refresh_token, role: [Roles.USER] }
        })

        return this.rhs.success(returnData)
    }

    async createToken(
        connection: Transaction<DB> | null,
        userData: UserDataType,
        type: 'auth' | 'refresh',
    ): Promise<string> {
        let trx: Transaction<DB> | DatabaseType | undefined
        if (connection) trx = connection
        else trx = this.db

        const tokenInfo: Omit<tokenData, 'iat' | 'exp'> = {
            id: userData.id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            status: userData.status,
            role: [Roles.USER],
        }

        const expiresIn = type === 'auth' ? ENV.AUTH_EXPIRY : ENV.REFRESH_EXPIRY
        const token = await this.jwtService.signAsync(tokenInfo, {
            expiresIn,
        })

        const tokenDeatils = (await this.jwtService.decode(token)) as tokenData

        const issued_at = moment(tokenDeatils.iat, 'X').utc().format(dbUtcFrmt)
        const expire_at = moment(tokenDeatils.exp, 'X').utc().format(dbUtcFrmt)
        const tokenData = {
            user_id: userData.id,
            token,
            issued_at,
            expire_at,
        }

        const tokenTable = type === 'auth' ? 'UserAuthToken' : 'UserRefreshToken'
        await trx.insertInto(tokenTable).values(tokenData).executeTakeFirstOrThrow()
        return token
    }

    async checkMeOut() {
        this.logger.log('you should not see this')
    }
}
