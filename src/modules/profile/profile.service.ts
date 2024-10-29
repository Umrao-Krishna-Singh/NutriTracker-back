import { Injectable, Inject, Logger } from '@nestjs/common'
import { UserOptionalDefaults } from '@prism/zod'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import { UserResponseDto } from './profile.dto'

@Injectable()
export class ProfileService {
    private db: DatabaseType
    private readonly logger: Logger
    constructor(@Inject(DatabaseService) database: DatabaseService) {
        this.db = database.db()
        this.logger = new Logger(ProfileService.name)
    }

    async getHello(): Promise<'Success from backend!'> {
        //check if database can be reached
        await this.db
            .selectFrom('User')
            .select('User.id')
            .where('User.id', '=', 1)
            .execute()

        return 'Success from backend!'
    }

    async signup(usr: Omit<UserOptionalDefaults, 'status'>): Promise<UserResponseDto> {
        let user: UserResponseDto | undefined
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
