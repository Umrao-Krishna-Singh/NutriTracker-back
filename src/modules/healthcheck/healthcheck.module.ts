import { Module } from '@nestjs/common'
import { HealthCheckController } from './healthcheck.controller'
import { HealthCheckService } from './healthcheck.service'
import { ResHelperModule } from '@src/response-helpers/res-help.module'

@Module({
    imports: [ResHelperModule],
    controllers: [HealthCheckController],
    providers: [HealthCheckService],
})
export class HealthCheckModule {}
