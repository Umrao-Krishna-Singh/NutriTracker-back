import { Inject, Get } from '@nestjs/common'
import { HealthCheckService } from './healthcheck.service'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'
import { ApiController } from '@src/common/decorators/api-controller.decorator'

@ApiController()
export class HealthCheckController {
    constructor(
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private readonly healthCheckService: HealthCheckService,
    ) {}

    @Get('/test')
    async getHello(): Promise<'Success from backend!'> {
        this.logger.http('request received')

        return await this.healthCheckService.getHello()
    }
}
