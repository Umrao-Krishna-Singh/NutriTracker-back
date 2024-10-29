import { Module, Global } from '@nestjs/common'
import { DatabaseService } from './db.service'

@Module({
    providers: [DatabaseService],
    exports: [DatabaseService],
})
@Global()
export class DatabaseModule {}
