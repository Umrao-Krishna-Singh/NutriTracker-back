import { Injectable, Inject, Logger } from '@nestjs/common'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import { FoodSearchResponseDto } from './search.dto'

@Injectable()
export class SearchService {
    private db: DatabaseType
    private readonly logger: Logger

    constructor(@Inject(DatabaseService) database: DatabaseService) {
        this.db = database.db()
        this.logger = new Logger(SearchService.name)
    }

    async getFoodDetails(search: string): Promise<FoodSearchResponseDto[]> {
        return await this.db
            .selectFrom('Food')
            .innerJoin('FoodNutrition', 'Food.id', 'FoodNutrition.food_id')
            .select(['Food.id', 'Food.description'])
            .where('Food.description', 'like', '%' + search + '%')
            .execute()
    }
}
