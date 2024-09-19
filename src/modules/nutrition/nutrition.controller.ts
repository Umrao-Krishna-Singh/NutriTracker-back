import { Get, UsePipes, Query, Logger } from '@nestjs/common'
import { SearchService } from './nutrition.service'
import { ApiController } from '@src/common/decorators/api-controller.decorator'
import { FoodSearchDto, FoodSearchResponseDto } from './nutrition.dto'
import { GetFoodSearchValidationPipe } from './nutrition.pipe'

@ApiController('search')
export class SearchController {
    private readonly logger: Logger

    constructor(private readonly searchService: SearchService) {
        this.logger = new Logger(SearchController.name)
    }

    @Get('/food')
    @UsePipes(new GetFoodSearchValidationPipe())
    async getFoodDetails(
        @Query() foodSearchDto: FoodSearchDto,
    ): Promise<FoodSearchResponseDto[]> {
        return await this.searchService.getFoodDetails(foodSearchDto.search)
    }
}
