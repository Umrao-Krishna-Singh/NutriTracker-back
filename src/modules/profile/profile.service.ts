import { Injectable, Inject, Logger, BadRequestException } from '@nestjs/common'
// import { UserOptionalDefaults } from '@prism/zod'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import {
    EmailCheckResDto,
    LoginResDto,
    SignupBodyDto,
    SignupResDto,
    SignupResItem,
    UserUpdateBodyDto,
    UserUpdateResDto,
} from './profile.dto'
import { ResHelperService } from '@src/response-helpers/res-help.service'
import { ENV } from '@src/app.config'
import { hash } from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import type { TokenData, UserInfo } from '@src/utils/auth-payload.util'
import { Roles } from '@prism/keysley/enums'
import * as moment from 'moment'
import { sendOtpMail } from '@src/utils/send-otp.util'
import { dbUtcFrmt } from '@src/constants/system.constant'
import { Transaction } from 'kysely'
import { DB } from '@prism/keysley/types'

@Injectable()
export class ProfileService {
    private db: DatabaseType
    private logger = new Logger(ProfileService.name)

    constructor(
        @Inject(DatabaseService) database: DatabaseService,
        private RHS: ResHelperService,
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

        if (user?.is_created) return this.RHS.success(true)

        if (!user || !user.status) {
            await this.createEmailAndSendOtp(email)
            return this.RHS.success(false)
        } else if (!user.is_created) {
            await this.createEmailAndSendOtp(email, user.resend)
            return this.RHS.success(false)
        } else return this.RHS.success(true)
    }

    async createEmailAndSendOtp(email: string, resend?: Date): Promise<void> {
        const currentDate = new Date()
        if (resend && moment(resend, dbUtcFrmt).isAfter(currentDate)) return

        const otp = this.generateOtp()
        const expire_at = moment().add(ENV.OTP_EXPIRY, 'minutes').format(dbUtcFrmt)
        const resend_expire_at = moment()
            .add(ENV.OTP_RESEND_EXPIRY, 'minutes')
            .format(dbUtcFrmt)
        const updated_at = moment().format(dbUtcFrmt)

        await this.db.transaction().execute(async (trx) => {
            const userEmail = { email }
            const dupEmailKey = { status: true, is_created: false, user_id: null }
            const email_id = (
                await trx
                    .insertInto('UserEmail')
                    .values(userEmail)
                    .onConflict((oc) => oc.column('email').doUpdateSet(dupEmailKey))
                    .returning('id')
                    .executeTakeFirstOrThrow()
            ).id

            const userOtp = { email_id, otp, expire_at, resend_expire_at }
            const dupOtpKey = { otp, expire_at, updated_at, resend_expire_at }

            await trx
                .insertInto('UserEmailOtp')
                .values(userOtp)
                .onConflict((oc) => oc.column('email_id').doUpdateSet(dupOtpKey))
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

    async createToken(
        connection: Transaction<DB> | null,
        userData: Omit<TokenData, 'iat' | 'exp' | 'type'>,
        type: 'auth' | 'refresh',
    ): Promise<string> {
        let trx: Transaction<DB> | DatabaseType | undefined
        if (connection) trx = connection
        else trx = this.db

        const tokenInfo: Omit<TokenData, 'iat' | 'exp'> = {
            id: userData.id,
            first_name: userData.first_name,
            last_name: userData.last_name,
            status: userData.status,
            role: userData.role,
            type,
        }

        const expiresIn = type === 'auth' ? ENV.AUTH_EXPIRY : ENV.REFRESH_EXPIRY
        const token = await this.jwtService.signAsync(tokenInfo, {
            expiresIn,
        })

        const tokenDeatils = (await this.jwtService.decode(token)) as TokenData
        const issued_at = moment(tokenDeatils.iat, 'X').utc().format(dbUtcFrmt)
        const expire_at = moment(tokenDeatils.exp, 'X').utc().format(dbUtcFrmt)
        const tokenData = { user_id: userData.id, token, issued_at, expire_at }
        const dupToken = { token, issued_at, expire_at }

        if (type === 'refresh')
            await trx
                .insertInto('UserRefreshToken')
                .values(tokenData)
                .onConflict((oc) => oc.column('user_id').doUpdateSet(dupToken))
                .executeTakeFirstOrThrow()

        return token
    }

    async signup(usr: SignupBodyDto): Promise<SignupResDto> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, otp, email, ...rest } = usr
        const pass_hash = await hash(password, ENV.SALT_ROUNDS)
        const user = { ...rest, pass_hash }

        const isVerified = await this.verifyEmail(email, otp)
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
                .where('UserEmail.email', '=', email)
                .executeTakeFirstOrThrow()

            const [auth_token, refresh_token] = await Promise.all([
                this.createToken(trx, { ...userData, role: [Roles.USER] }, 'auth'),
                this.createToken(trx, { ...userData, role: [Roles.USER] }, 'refresh'),
            ])

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { status, ...returnInfo } = userData
            returnData = { ...returnInfo, auth_token, refresh_token, role: [Roles.USER] }
        })

        return this.RHS.success(returnData)
    }

    async login(userInfo: UserInfo): Promise<LoginResDto> {
        if (!userInfo.length) throw new BadRequestException('Invalid Credentials!')
        const userRoles = userInfo.map((v) => v.role)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { role, ...userData } = userInfo[0]

        const [auth_token, refresh_token] = await Promise.all([
            this.createToken(null, { ...userData, role: userRoles }, 'auth'),
            this.createToken(null, { ...userData, role: userRoles }, 'refresh'),
        ])

        const user = { ...userData, auth_token, refresh_token, role: userRoles }
        return this.RHS.success(user)
    }

    async refreshToken(token: TokenData): Promise<LoginResDto> {
        const [auth_token, refresh_token] = await Promise.all([
            this.createToken(null, token, 'auth'),
            this.createToken(null, token, 'refresh'),
        ])

        return this.RHS.success({
            id: token.id,
            first_name: token.first_name,
            last_name: token.last_name,
            role: token.role,
            status: token.status,
            auth_token,
            refresh_token,
        })
    }

    async UpdateUser(
        input: UserUpdateBodyDto,
        token: TokenData,
    ): Promise<UserUpdateResDto> {
        const userData = await this.db
            .updateTable('User')
            .set(input)
            .where('id', '=', token.id)
            .returning([
                'id',
                'first_name',
                'last_name',
                'weight',
                'goal_weight',
                'height',
            ])
            .executeTakeFirstOrThrow()

        return this.RHS.success({ ...userData, role: token.role })
    }

    async checkMeOut() {
        this.logger.log('you should not see this')
    }
}
