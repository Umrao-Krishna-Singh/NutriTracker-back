import { Get, UsePipes, Query, Logger } from '@nestjs/common'
import { NutritionService } from './nutrition.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'
import { FoodSearchDto, FoodSearchResponseDto } from './nutrition.dto'
import { GetFoodSearchValidationPipe } from './nutrition.pipe'

@ApiController('nutrition')
export class NutritionController {
    private readonly logger: Logger

    constructor(private readonly searchService: NutritionService) {
        this.logger = new Logger(NutritionController.name)
    }

    @Get('/food-details')
    @UsePipes(GetFoodSearchValidationPipe)
    async getFoodDetails(
        @Query() foodSearchDto: FoodSearchDto,
    ): Promise<FoodSearchResponseDto[]> {
        return await this.searchService.getFoodDetails(foodSearchDto.search)
    }
}
