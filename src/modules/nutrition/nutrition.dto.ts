import { z } from 'zod'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { SuccessDto } from '@src/constants/swagger.constant'

export const getFoodSuggestedListSchema = z
    .object({ search: z.string().min(1) })
    .required()

const pgnReqScm = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).default(10),
})

export const getFoodListFullSchema = pgnReqScm
    .extend({ search: z.string().min(1) })
    .required()
export class GetFoodListSuggestQueryDto {
    @ApiProperty({ example: 'Milk', description: 'Food item name' })
    search!: string
}

class PgnReqDto {
    @ApiPropertyOptional({ example: 1, description: 'Page number' })
    page!: number
    @ApiPropertyOptional({ example: 10, description: 'Number of items per page' })
    limit!: number
}

export class GetFoodListFullQueryDto extends PgnReqDto {
    @ApiProperty({ example: 'Milk', description: 'Food item name' })
    search!: string
}
export class GetFoodItemResDto {
    @ApiProperty({ example: 20, description: 'ID of the food item' })
    id!: number
    @ApiProperty({ example: 'milk', description: 'Description of the food item' })
    description!: string
}

export class GetFoodListSuggestResDto extends SuccessDto {
    @ApiProperty({
        type: [GetFoodItemResDto],
        example: [{ id: 20, description: 'milk' }],
        nullable: true,
        description:
            'List of food items that match the search. Returns null when no search matches found.',
    })
    data!: GetFoodItemResDto | null
}
