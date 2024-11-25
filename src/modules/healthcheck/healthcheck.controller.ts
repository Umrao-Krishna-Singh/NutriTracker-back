import { Get, Logger } from '@nestjs/common'
import { HealthCheckService } from './healthcheck.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'
import { HealthCheckDto } from './healthcheck.dto'
import { ApiOpenResponse } from '@src/common/decorators/swagger.decorator'

@ApiController()
export class HealthCheckController {
    private readonly logger = new Logger(HealthCheckController.name)
    constructor(private readonly healthCheckService: HealthCheckService) {}

    @Get('/test')
    @ApiOpenResponse({ type: HealthCheckDto })
    async getHello(): Promise<HealthCheckDto> {
        this.logger.log('request received')

        return await this.healthCheckService.getHello()
    }
}
