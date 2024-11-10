import { ApiProperty } from '@nestjs/swagger'

export class SuccessDto {
    @ApiProperty({ example: true, description: 'Response status' })
    status!: boolean
    @ApiProperty({ example: 200, description: 'Response code' })
    code!: number
}
