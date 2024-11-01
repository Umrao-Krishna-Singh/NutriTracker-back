import { Get, Logger } from '@nestjs/common'
import { HealthCheckService } from './healthcheck.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'
import { ApiOkResponse } from '@nestjs/swagger'
import { Healthcheck } from './healthcheck.entity'
import { ApiUnsuccessfulResponse } from '@src/common/decorators/swagger.decorator'

@ApiController()
export class HealthCheckController {
    private readonly logger: Logger
    constructor(private readonly healthCheckService: HealthCheckService) {
        this.logger = new Logger(HealthCheckController.name)
    }

    @ApiUnsuccessfulResponse()
    @ApiOkResponse({ type: Healthcheck })
    @Get('/test')
    async getHello(): Promise<'Success from backend!'> {
        this.logger.log('request received')

        return await this.healthCheckService.getHello()
    }
}
