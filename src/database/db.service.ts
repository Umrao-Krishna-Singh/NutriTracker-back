import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { ENV, isDev } from '@src/app.config'
import { DB } from '@prism/keysley/types'

@Injectable()
export class DatabaseService implements OnModuleInit {
    private readonly dialect = new PostgresDialect({
        pool: new Pool({
            database: ENV.DB_NAME,
            host: ENV.DB_HOST,
            user: ENV.DB_USER,
            password: ENV.DB_PASS,
            port: ENV.DB_PORT,
            max: ENV.DB_CONN_LIMIT,
        }),
    })

    private client: Kysely<DB> = isDev
        ? new Kysely({ log: ['query', 'error'], dialect: this.dialect })
        : new Kysely({ dialect: this.dialect })

    private logger: Logger = new Logger(DatabaseService.name)

    async onModuleInit() {
        try {
            await this.client
                .selectFrom('User')
                .select('User.id')
                .where('User.id', '=', 1)
                .execute()

            this.logger.log('----Database Connected----')
        } catch (err) {
            this.logger.error(err)
            throw err
        }
    }

    db(): Kysely<DB> {
        return this.client
    }
}

export type DatabaseType = Kysely<DB>
