import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import { ENV } from '../../src/app.config'
import { DB } from '../keysley/types'

export class DatabaseService {
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

    private client: Kysely<DB> = new Kysely({
        log: ['query', 'error'],
        dialect: this.dialect,
    })

    async db(): Promise<Kysely<DB>> {
        await this.client
            .selectFrom('User')
            .select('User.id')
            .where('User.id', '=', '1')
            .execute()

        console.log('----Database Connected----')
        return this.client
    }

    async closeConnection(): Promise<void> {
        await this.client.destroy()
        console.log('----Database Connection Closed----')
    }
}

/**
4:0 (g) - Butyric Acid
6:0 (g) - Caproic Acid
8:0 (g) - Caprylic Acid
10:0 (g) - Capric Acid
12:0 (g) - Lauric Acid
14:0 (g) - Myristic Acid
16:0 (g) - Palmitic Acid
18:0 (g) - Stearic Acid
16:1 (g) - Palmitoleic Acid
18:1 (g) - Oleic Acid
20:1 (g) - Gondoic Acid
22:1 (g) - Erucic Acid
18:2 (g) - Linoleic Acid
18:3 (g) - Alpha-Linolenic Acid
18:4 (g) - Stearidonic Acid
20:4 (g) - Arachidonic Acid
20:5 n-3 (g) - Eicosapentaenoic Acid (EPA)
22:5 n-3 (g) - Docosapentaenoic Acid (DPA)
22:6 n-3 (g) - Docosahexaenoic Acid (DHA)
 */
