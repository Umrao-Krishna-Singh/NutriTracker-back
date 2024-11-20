import { Logger, Get, Query, Param, Body } from '@nestjs/common'
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
} from './nutrition.dto'
import { ZodValidationPipe } from '@src/common/pipes/zod-input-validation.pipe'
import { ApiGeneralResponse } from '@src/common/decorators/swagger.decorator'

@ApiController('nutrition')
export class NutritionController {
    private readonly logger = new Logger(NutritionController.name)
    constructor(private readonly searchService: NutritionService) {}

    @Get('/food-list-suggest')
    @ApiGeneralResponse({ type: GetFoodListSuggestResDto })
    async getFoodListSuggest(
        @Query(new ZodValidationPipe(getFoodSuggestedListSchema))
        foodListDto: GetFoodListSuggestQueryDto,
    ): Promise<GetFoodItemResDto[]> {
        return await this.searchService.getFoodListSuggest(foodListDto.search)
    }

    @Get('/food-list')
    @ApiGeneralResponse({ type: GetFoodListResDto })
    async getFoodList(
        @Query(new ZodValidationPipe(getFoodListFullSchema))
        foodListDto: GetFoodListFullQueryDto,
    ): Promise<GetFoodListResDto> {
        return await this.searchService.getFoodList(foodListDto)
    }
}
