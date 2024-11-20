import { Injectable, Inject } from '@nestjs/common'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import { ResHelperService } from '@src/response-helpers/res-help.service'
import { HealthCheckDto } from './healthcheck.dto'

@Injectable()
export class HealthCheckService {
    private db: DatabaseType
    constructor(
        @Inject(DatabaseService) database: DatabaseService,
        private readonly rhs: ResHelperService,
    ) {
        this.db = database.db()
    }

    async getHello(): Promise<HealthCheckDto> {
        //check if database can be reached
        await this.db
            .selectFrom('User')
            .select('User.id')
            .where('User.id', '=', 1)
            .execute()

        return this.rhs.success('Success from backend!')
    }
}
