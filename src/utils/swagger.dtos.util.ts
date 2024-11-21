import { ApiProperty } from '@nestjs/swagger'

export class SuccessDto {
    @ApiProperty({ example: true, description: 'Response status' })
    status!: boolean
    @ApiProperty({ example: 200, description: 'Response code' })
    code!: number
}

export class PaginateDto {
    @ApiProperty({ example: true, description: 'Response status' })
    status!: boolean
    @ApiProperty({ example: 200, description: 'Response code' })
    code!: number
    @ApiProperty({ example: 1, description: 'Page number' })
    page!: number
    @ApiProperty({ example: 5, description: 'Total number of pages' })
    pageCount!: number
}

export class PgReqDto {
    @ApiProperty({ example: 1, description: 'Page number' })
    page!: number
    @ApiProperty({ example: 10, description: 'Number of items per page' })
    limit!: number
}
