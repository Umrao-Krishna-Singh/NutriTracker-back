import { Injectable, Inject, Logger, InternalServerErrorException } from '@nestjs/common'
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

    async checkEmail(email: string): Promise<EmailCheckResDto> {
        const user = await this.db
            .selectFrom('User')
            .select('email')
            .where('email', '=', email)
            .where('status', '=', 1)
            .executeTakeFirst()

        if (!user) return this.rhs.success(false)
        else return this.rhs.success(true)
    }

    async signup(usr: SignupBodyDto): Promise<SignupResDto> {
        const pass_hash = await hash(usr.password, ENV.SALT_ROUNDS)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = usr
        const user = { ...rest, pass_hash }

        let returnData: SignupResItem | null = null

        await this.db.transaction().execute(async (trx) => {
            const { insertId } = (await trx.insertInto('User').values(user).execute())[0]

            const userData = await trx
                .selectFrom('User')
                .select([
                    'id',
                    'first_name',
                    'last_name',
                    'height',
                    'goal_weight',
                    'weight',
                    'is_verified',
                    'status',
                ])
                .where('id', '=', Number(insertId))
                .executeTakeFirst()

            if (!userData)
                throw new Error(`User created but details not found: id ${insertId}`)

            const user_id = Number(insertId)
            const userRole = { user_id, role: Roles.USER }
            await trx.insertInto('UserRole').values(userRole).executeTakeFirstOrThrow()

            const tokenInfo: Omit<tokenData, 'iat' | 'exp'> = {
                id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                is_verified: userData.is_verified,
                status: userData.status,
                role: [Roles.USER],
            }

            const auth_token = await this.jwtService.signAsync(tokenInfo, {
                expiresIn: ENV.AUTH_EXPIRY,
            })

            const authTokenDeatils = (await this.jwtService.decode(
                auth_token,
            )) as tokenData

            const utcFrmt = 'YYYY-MM-DD HH:mm:ss.sss'
            let issued_at = moment(authTokenDeatils.iat, 'X').utc().format(utcFrmt)
            let expire_at = moment(authTokenDeatils.exp, 'X').utc().format(utcFrmt)
            const authTokenData = { user_id, token: auth_token, issued_at, expire_at }

            await trx
                .insertInto('UserAuthToken')
                .values(authTokenData)
                .executeTakeFirstOrThrow()

            const refresh_token = await this.jwtService.signAsync(tokenInfo, {
                expiresIn: ENV.REFRESH_EXPIRY,
            })

            const refTokenDetails = (await this.jwtService.decode(
                refresh_token,
            )) as tokenData

            issued_at = moment(refTokenDetails.iat, 'X').utc().format(utcFrmt)
            expire_at = moment(refTokenDetails.exp, 'X').utc().format(utcFrmt)
            const refTokenData = { user_id, token: refresh_token, issued_at, expire_at }

            await trx
                .insertInto('UserRefreshToken')
                .values(refTokenData)
                .executeTakeFirstOrThrow()

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { is_verified, status, ...returnInfo } = userData
            returnData = { ...returnInfo, auth_token, refresh_token, role: [Roles.USER] }
        })

        return this.rhs.success(returnData)
    }

    async checkMeOut() {
        this.logger.log('you should not see this')
    }
}
