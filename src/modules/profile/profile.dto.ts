import { z } from 'zod'
import { ApiProperty } from '@nestjs/swagger'
// import { co, pgReqSchema } from '@src/utils/zod-common.schema.util'
import { SuccessDto } from '@src/utils/swagger.dtos.util'

export const emailCheckSchema = z.object({ email: z.string().email() })

export class EmailCheckBodyDto {
    @ApiProperty({ example: 'mynew@email.com', description: 'User email address' })
    email!: string
}

export class EmailCheckResDto extends SuccessDto {
    @ApiProperty({ type: Boolean, example: true })
    data!: boolean
}
