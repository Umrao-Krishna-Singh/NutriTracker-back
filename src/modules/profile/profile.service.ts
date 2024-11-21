import { Injectable, Inject, Logger } from '@nestjs/common'
import { UserOptionalDefaults } from '@prism/zod'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import { EmailCheckResDto, EmailResEnum, SignupResponseDto } from './profile.dto'
import { ResHelperService } from '@src/response-helpers/res-help.service'

@Injectable()
export class ProfileService {
    private db: DatabaseType
    private readonly logger = new Logger(ProfileService.name)

    constructor(
        @Inject(DatabaseService) database: DatabaseService,
        private readonly rhs: ResHelperService,
    ) {
        this.db = database.db()
    }

    async checkEmail(email: string): Promise<EmailCheckResDto> {
        const user = await this.db
            .selectFrom('User')
            .select(['email', 'is_verified', 'status'])
            .where('email', '=', email)
            .where('status', '=', 1)
            .executeTakeFirst()

        if (!user) {
            //signup
            return this.rhs.success(EmailResEnum.notFound)
        } else if (!user.is_verified) {
            //send otp email and ask for it
            return this.rhs.success(EmailResEnum.unverified)
        } else {
            return this.rhs.success(EmailResEnum.found)
        }
    }

    async signup(
        usr: Omit<UserOptionalDefaults, 'status' | 'is_verified'>,
    ): Promise<SignupResponseDto> {
        let user: SignupResponseDto | undefined
        const { insertId } = (await this.db.insertInto('User').values(usr).execute())[0]

        if (insertId)
            user = await this.db
                .selectFrom('User')
                .select(['id', 'username', 'fullname', 'email'])
                .where('id', '=', Number(insertId))
                .where('status', '=', 1)
                .executeTakeFirst()

        if (!user) throw new Error(`User created but details not found: id ${insertId}`)
        return user
    }
}
