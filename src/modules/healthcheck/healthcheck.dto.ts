import { ApiProperty } from '@nestjs/swagger'
import { SuccessDto } from '@src/utils/swagger.dtos.util'
export class HealthCheckDto extends SuccessDto {
    @ApiProperty({ example: 'Success from backend!', description: 'Value of response' })
    data!: string
}
