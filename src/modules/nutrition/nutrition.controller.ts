import { Get, UsePipes, Query, Logger } from '@nestjs/common'
import { NutritionService } from './nutrition.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'
import {
    GetFoodListResDto,
    GetFoodItemResDto,
    GetFoodListQueryDto,
} from './nutrition.dto'

import { GetFoodListValidationPipe } from './nutrition.pipe'
import { ApiGeneralResponse } from '@src/common/decorators/swagger.decorator'

@ApiController('nutrition')
export class NutritionController {
    private readonly logger = new Logger(NutritionController.name)
    constructor(private readonly searchService: NutritionService) {}

    @Get('/food-list')
    @ApiGeneralResponse({ type: GetFoodListResDto })
    @UsePipes(GetFoodListValidationPipe)
    async getFoodDetails(
        @Query() foodListDto: GetFoodListQueryDto,
    ): Promise<GetFoodItemResDto[]> {
        return await this.searchService.getFoodList(foodListDto.search)
    }
}
