import { ApiProperty } from '@nestjs/swagger'

export class HealthCheckDto {
    @ApiProperty({ example: 200, description: 'Status code of response' })
    statusCode!: number
    @ApiProperty({ example: 'Success', description: 'Response message from the API' })
    message!: string
    @ApiProperty({ example: 'Success from backend!', description: 'Value of response' })
    data!: string
}
