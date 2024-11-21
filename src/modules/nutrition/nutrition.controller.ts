import { Logger, Get, Query } from '@nestjs/common'
import { NutritionService } from './nutrition.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'
import {
    GetFoodListSuggestResDto,
    GetFoodItemResDto,
    GetFoodListSuggestQueryDto,
    GetFoodListFullQueryDto,
    getFoodSuggestedListSchema,
    getFoodListFullSchema,
    GetFoodListResDto,
    FoodDetailsQueryDto,
    GetFoodDetailsDto,
    DetailsQuerySchema,
} from './nutrition.dto'
import { ZodValidationPipe } from '@src/common/pipes/zod-input-validation.pipe'
import { ApiOpenResponse } from '@src/common/decorators/swagger.decorator'

@ApiController('nutrition')
export class NutritionController {
    private readonly logger = new Logger(NutritionController.name)
    constructor(private readonly searchService: NutritionService) {}

    @Get('/food-list-suggest')
    @ApiOpenResponse({ type: GetFoodListSuggestResDto })
    async getFoodListSuggest(
        @Query(new ZodValidationPipe(getFoodSuggestedListSchema))
        foodListDto: GetFoodListSuggestQueryDto,
    ): Promise<GetFoodItemResDto[]> {
        return await this.searchService.getFoodListSuggest(foodListDto.search)
    }

    @Get('/food-list')
    @ApiOpenResponse({ type: GetFoodListResDto })
    async getFoodList(
        @Query(new ZodValidationPipe(getFoodListFullSchema))
        foodListDto: GetFoodListFullQueryDto,
    ): Promise<GetFoodListResDto> {
        return await this.searchService.getFoodList(foodListDto)
    }

    @Get('/food-details')
    @ApiOpenResponse({ type: GetFoodDetailsDto })
    async getFoodDetails(
        @Query(new ZodValidationPipe(DetailsQuerySchema))
        food: FoodDetailsQueryDto,
    ): Promise<GetFoodDetailsDto> {
        return await this.searchService.getFoodDetails(food)
    }
}
