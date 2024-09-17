import { Get, Logger } from '@nestjs/common'
import { HealthCheckService } from './healthcheck.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'

@ApiController()
export class HealthCheckController {
    private readonly logger: Logger
    constructor(private readonly healthCheckService: HealthCheckService) {
        this.logger = new Logger(HealthCheckController.name)
    }

    @Get('/test')
    async getHello(): Promise<'Success from backend!'> {
        this.logger.log('request received')

        return await this.healthCheckService.getHello()
    }
}
