import { Logger, Get, Query, Param, Body } from '@nestjs/common'
import { NutritionService } from './nutrition.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'
import {
    GetFoodListResDto,
    GetFoodItemResDto,
    GetFoodListQueryDto,
    getFoodListSchema,
} from './nutrition.dto'
import { ZodValidationPipe } from '@src/common/pipes/zod-input-validation.pipe'
import { ApiGeneralResponse } from '@src/common/decorators/swagger.decorator'

@ApiController('nutrition')
export class NutritionController {
    private readonly logger = new Logger(NutritionController.name)
    constructor(private readonly searchService: NutritionService) {}

    @Get('/food-list')
    @ApiGeneralResponse({ type: GetFoodListResDto })
    async getFoodDetails(
        @Query(new ZodValidationPipe(getFoodListSchema))
        foodListDto: GetFoodListQueryDto,
    ): Promise<GetFoodItemResDto[]> {
        return await this.searchService.getFoodList(foodListDto.search)
    }
}
