import { Injectable, Inject, Logger } from '@nestjs/common'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import { GetFoodItemResDto } from './nutrition.dto'

@Injectable()
export class NutritionService {
    private db: DatabaseType
    private readonly logger = new Logger(NutritionService.name)

    constructor(@Inject(DatabaseService) database: DatabaseService) {
        this.db = database.db()
    }

    async getFoodList(search: string): Promise<GetFoodItemResDto[]> {
        return await this.db
            .selectFrom('Food')
            .innerJoin('FoodNutrition', 'Food.id', 'FoodNutrition.food_id')
            .select(['Food.id', 'Food.description'])
            .where('Food.description', 'like', '%' + search + '%')
            .execute()
    }
}
