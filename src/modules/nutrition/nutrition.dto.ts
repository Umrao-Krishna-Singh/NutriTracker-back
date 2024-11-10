import { z } from 'zod'
import { ApiProperty } from '@nestjs/swagger'
import { SuccessDto } from '@src/constants/swagger.constant'

export const getFoodListSchema = z.object({ search: z.string().min(1) }).required()
export type FoodListQueryDto = z.infer<typeof getFoodListSchema>
export class GetFoodListQueryDto {
    @ApiProperty({ example: 'Milk', description: 'Food item name' })
    search!: string
}

export class GetFoodItemResDto {
    @ApiProperty({ example: 20, description: 'ID of the food item' })
    id!: number
    @ApiProperty({ example: 'milk', description: 'Description of the food item' })
    description!: string
}

export class GetFoodListResDto extends SuccessDto {
    @ApiProperty({
        type: [GetFoodItemResDto],
        example: [{ id: 20, description: 'Milk' }],
        description: 'List of food items that match the search',
    })
    data!: GetFoodItemResDto[]
}
