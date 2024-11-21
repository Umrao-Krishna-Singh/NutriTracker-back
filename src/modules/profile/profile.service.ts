import { Injectable, Inject, Logger } from '@nestjs/common'
// import { UserOptionalDefaults } from '@prism/zod'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import { EmailCheckResDto } from './profile.dto'
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
            return this.rhs.success(false)
        } else {
            return this.rhs.success(true)
        }
    }

    async signup() // usr: Omit<UserOptionalDefaults, 'status' | 'is_verified'>,
    : Promise<number> {
        // let user: SignupResponseDto | undefined
        // const { insertId } = (await this.db.insertInto('User').values(usr).execute())[0]

        // if (insertId)
        //     user = await this.db
        //         .selectFrom('User')
        //         .select(['id', 'username', 'fullname', 'email'])
        //         .where('id', '=', Number(insertId))
        //         .where('status', '=', 1)
        //         .executeTakeFirst()

        // if (!user) throw new Error(`User created but details not found: id ${insertId}`)
        // return user

        return 1
    }
}
