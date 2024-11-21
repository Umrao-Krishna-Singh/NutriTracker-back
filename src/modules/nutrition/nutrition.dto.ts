import { z } from 'zod'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { SuccessDto, PaginateDto, PgReqDto } from '@src/utils/swagger.dtos.util'
import { Units } from '@prism/keysley/enums'

const { coerce: co } = z
const pgReqSchema = z.object({
    page: co.number().int().min(1).default(1),
    limit: co.number().int().min(1).default(10),
})

export const getFoodSuggestedListSchema = z
    .object({ search: z.string().min(1) })
    .required()

export const getFoodListFullSchema = pgReqSchema
    .extend({ search: z.string().min(1) })
    .required()

export const DetailsQuerySchema = pgReqSchema.extend({ id: co.number().int().min(1) })
export class GetFoodListSuggestQueryDto {
    @ApiProperty({ example: 'Milk', description: 'Food item name' })
    search!: string
}

export class GetFoodListFullQueryDto extends PgReqDto {
    @ApiProperty({ example: 'Milk', description: 'Food item name' })
    search!: string
}

export class FoodDetailsQueryDto extends PgReqDto {
    @ApiProperty({ example: 20, description: 'Id of the food item' })
    id!: number
}
export class GetFoodItemResDto {
    @ApiProperty({ example: 20, description: 'ID of the food item' })
    id!: number
    @ApiProperty({ example: 'milk', description: 'Description of the food item' })
    description!: string
}

export class GetFoodListSuggestResDto extends SuccessDto {
    @ApiPropertyOptional({
        type: [GetFoodItemResDto],
        example: [{ id: 20, description: 'milk' }],
        nullable: true,
        description:
            'List of food items that match the search. Returns null when no search matches found.',
    })
    data!: GetFoodItemResDto[] | null
}

export class GetFoodListResDto extends PaginateDto {
    @ApiPropertyOptional({
        type: [GetFoodItemResDto],
        example: [{ id: 20, description: 'milk' }],
        nullable: true,
        description:
            'List of food items that match the search. Returns null when no search matches found.',
    })
    data!: GetFoodItemResDto[] | null
}

class FoodItemDetail {
    @ApiProperty({ example: 20, description: 'Food item id' })
    id!: number
    @ApiProperty({ example: 'Milk', description: 'Food item description' })
    description!: string
    @ApiProperty({ example: 35, description: 'Food Nutrient Id' })
    nutrient_id!: number
    @ApiProperty({ example: 'Protein', description: 'Nutrient name' })
    name!: string
    @ApiPropertyOptional({ example: 'MG', description: 'Unit name', nullable: true })
    unit_name!: Units | null
    @ApiProperty({ example: 90, description: 'Quantity of nutrient per 100g of food' })
    quantity!: number
}
export class GetFoodDetailsDto extends PaginateDto {
    @ApiPropertyOptional({ type: [FoodItemDetail], nullable: true })
    data!: FoodItemDetail[] | null
}
