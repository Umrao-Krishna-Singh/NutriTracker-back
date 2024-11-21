import { z } from 'zod'
import { ApiProperty } from '@nestjs/swagger'
// import { co, pgReqSchema } from '@src/utils/zod-common.schema.util'
import { SuccessDto } from '@src/utils/swagger.dtos.util'

export const emailCheckSchema = z.object({ email: z.string().email() })

export class EmailCheckBodyDto {
    @ApiProperty({ example: 'mynew@email.com', description: 'User email address' })
    email!: string
}

export const EmailResEnum = {
    notFound: 0,
    unverified: 1,
    found: 2,
} as const

export type BodyResEnum = (typeof EmailResEnum)[keyof typeof EmailResEnum]
export class EmailCheckResDto extends SuccessDto {
    @ApiProperty({
        enum: Object.values(EmailResEnum),
        description: 'User not found - 0, user unverified - 1, user found - 2 ',
    })
    data!: BodyResEnum
}

export type SignupResponseDto = {
    id: number
    fullname: string
    username: string
    email: string
}
