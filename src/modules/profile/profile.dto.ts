import { z } from 'zod'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
// import { co, pgReqSchema } from '@src/utils/zod-common.schema.util'
import { SuccessDto } from '@src/utils/swagger.dtos.util'
import { UserOptionalDefaultsSchema } from '@prism/zod/index'
import { Roles } from '@prism/keysley/enums'

export const emailCheckSchema = z.object({ email: z.string().trim().email().max(256) })

export class EmailCheckBodyDto {
    @ApiProperty({ example: 'mynew@email.com', description: 'User email address' })
    email!: string
}

export class EmailCheckResDto extends SuccessDto {
    @ApiProperty({ example: true })
    data!: boolean
}

export const signupSchema = UserOptionalDefaultsSchema.merge(
    z.object({
        first_name: z.string().trim().max(126),
        last_name: z.string().trim().max(126),
        email: z.string().trim().email().max(256),
        weight: z.number().int().nullable().default(null),
        goal_weight: z.number().int().nullable().default(null),
        height: z.number().int().nullable().default(null),
    }),
)
    .omit({ pass_hash: true })
    .extend({
        password: z.string().trim().min(12).max(35),
        otp: z.number().int().min(100000).max(999999),
    })

export class SignupBodyDto {
    @ApiProperty({ example: 'Ludwig Von', maxLength: 126 })
    first_name!: string
    @ApiProperty({ example: 'Beethoven', maxLength: 126 })
    last_name!: string
    @ApiProperty({
        example: 'a great and amazing password',
        minLength: 12,
        maxLength: 35,
    })
    password!: string
    @ApiProperty({ example: 'mynew@email.com', maxLength: 256 })
    email!: string
    @ApiProperty({ example: 123456 })
    otp!: number
    @ApiPropertyOptional({ example: 75500, description: 'weight in grams' })
    weight!: number | null
    @ApiPropertyOptional({ example: 65500, description: 'weight in grams' })
    goal_weight!: number | null
    @ApiPropertyOptional({ example: 17000, description: 'height in millimeters' })
    height!: number | null
}

export class SignupResItem {
    @ApiProperty({ example: 5 })
    id!: number
    @ApiProperty({ example: 'Ludwig Von' })
    first_name!: string
    @ApiProperty({ example: 'Beethoven' })
    last_name!: string
    @ApiPropertyOptional({ example: 75500, description: 'weight in grams' })
    weight!: number | null
    @ApiPropertyOptional({ example: 65500, description: 'weight in grams' })
    goal_weight!: number | null
    @ApiPropertyOptional({ example: 17000, description: 'height in millimeters' })
    height!: number | null
    @ApiProperty({ example: [Roles.USER] })
    role!: Roles[]
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0X25hbWUiOiJMdWR3aWcgVm9uIiwibGFzdF9uYW1lIjoiQmVldGhvdmVuIiwiaXNfdmVyaWZpZWQiOjAsInN0YXR1cyI6MSwiaWF0IjoxNzMyNDAyNzE2LCJleHAiOjE3Mzc1ODY3MTZ9.z4W8JDq7MAlJXLDdqah8o0vwzXp2xWxKriJrgSq_I9o',
    })
    auth_token!: string
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0X25hbWUiOiJMdWR3aWcgVm9uIiwibGFzdF9uYW1lIjoiQmVldGhvdmVuIiwiaXNfdmVyaWZpZWQiOjAsInN0YXR1cyI6MSwiaWF0IjoxNzMyNDAyNzE2LCJleHAiOjE3Mzc1ODY3MTZ9.z4W8JDq7MAlJXLDdqah8o0vwzXp2xWxKriJrgSq_I9o',
    })
    refresh_token!: string
}

export class SignupResDto extends SuccessDto {
    @ApiPropertyOptional({ type: SignupResItem, nullable: true })
    data!: SignupResItem | null
}

export class LoginResValue {
    @ApiProperty({ example: 5 })
    id!: number
    @ApiProperty({ example: 'Ludwig Von', maxLength: 126 })
    first_name!: string
    @ApiProperty({ example: 'Beethoven', maxLength: 126 })
    last_name!: string
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0X25hbWUiOiJMdWR3aWcgVm9uIiwibGFzdF9uYW1lIjoiQmVldGhvdmVuIiwiaXNfdmVyaWZpZWQiOjAsInN0YXR1cyI6MSwiaWF0IjoxNzMyNDAyNzE2LCJleHAiOjE3Mzc1ODY3MTZ9.z4W8JDq7MAlJXLDdqah8o0vwzXp2xWxKriJrgSq_I9o',
    })
    auth_token!: string
    @ApiProperty({
        example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImZpcnN0X25hbWUiOiJMdWR3aWcgVm9uIiwibGFzdF9uYW1lIjoiQmVldGhvdmVuIiwiaXNfdmVyaWZpZWQiOjAsInN0YXR1cyI6MSwiaWF0IjoxNzMyNDAyNzE2LCJleHAiOjE3Mzc1ODY3MTZ9.z4W8JDq7MAlJXLDdqah8o0vwzXp2xWxKriJrgSq_I9o',
    })
    refresh_token!: string
    @ApiProperty({ example: [Roles.USER] })
    role!: Roles[]
    @ApiProperty({ example: true })
    status!: boolean
}

export class LoginResDto extends SuccessDto {
    @ApiPropertyOptional({ type: LoginResValue })
    data!: LoginResValue
}

export const userUpdateSchema = z
    .object({
        first_name: z.string().trim().max(126).optional(),
        last_name: z.string().trim().max(126).optional(),
        weight: z.number().int().nullable().optional(),
        goal_weight: z.number().int().nullable().optional(),
        height: z.number().int().nullable().optional(),
    })
    //ensure that at least one of field exists
    .refine(
        (data) =>
            Object.values(data).some(
                (value) => value !== undefined && value !== null && value !== '',
            ),
        { message: 'At least one field must be provided' },
    )

export class UserUpdateBodyDto {
    @ApiPropertyOptional({ example: 'Ludwig Von', maxLength: 126 })
    first_name?: string
    @ApiPropertyOptional({ example: 'Beethoven', maxLength: 126 })
    last_name?: string
    @ApiPropertyOptional({ example: 75500, description: 'weight in grams' })
    weight?: number | null
    @ApiPropertyOptional({ example: 65500, description: 'weight in grams' })
    goal_weight?: number | null
    @ApiPropertyOptional({ example: 17000, description: 'height in millimeters' })
    height?: number | null
}

class UserUpdateResItem {
    @ApiProperty({ example: 5 })
    id!: number
    @ApiProperty({ example: 'Ludwig Von' })
    first_name!: string
    @ApiProperty({ example: 'Beethoven' })
    last_name!: string
    @ApiPropertyOptional({ example: 75500, description: 'weight in grams' })
    weight!: number | null
    @ApiPropertyOptional({ example: 65500, description: 'weight in grams' })
    goal_weight!: number | null
    @ApiPropertyOptional({ example: 17000, description: 'height in millimeters' })
    height!: number | null
    @ApiProperty({ example: [Roles.USER] })
    role!: Roles[]
}

export class UserUpdateResDto extends SuccessDto {
    @ApiPropertyOptional({ type: UserUpdateResItem })
    data!: UserUpdateResItem
}
