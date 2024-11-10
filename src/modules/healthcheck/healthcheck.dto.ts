import { ApiProperty } from '@nestjs/swagger'
import { SuccessDto } from '@src/constants/swagger.constant'
export class HealthCheckDto extends SuccessDto {
    @ApiProperty({ example: 'Success from backend!', description: 'Value of response' })
    data!: string
}
