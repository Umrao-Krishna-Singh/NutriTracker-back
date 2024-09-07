import { Injectable, Inject } from '@nestjs/common'
import { DatabaseService, DatabaseType } from '@src/database/db.service'

@Injectable()
export class HealthCheckService {
    private db: DatabaseType

    constructor(@Inject(DatabaseService) database: DatabaseService) {
        this.db = database.db()
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
}
