import { Injectable, Inject, Logger } from '@nestjs/common'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import {
    GetFoodItemResDto,
    GetFoodListResDto,
    GetFoodListFullQueryDto,
    GetFoodDetailsDto,
    FoodDetailsQueryDto,
} from './nutrition.dto'
import { sql } from 'kysely'
import { ResHelperService } from '@src/response-helpers/res-help.service'

@Injectable()
export class NutritionService {
    private db: DatabaseType
    private readonly logger = new Logger(NutritionService.name)

    constructor(
        @Inject(DatabaseService) database: DatabaseService,
        private readonly RHS: ResHelperService,
    ) {
        this.db = database.db()
    }

    async getFoodListSuggest(search: string): Promise<GetFoodItemResDto[]> {
        return await this.db
            .selectFrom('Food')
            .select(['Food.id', 'Food.description'])
            .where('description', 'like', '%' + search + '%')
            .orderBy(sql`LENGTH(description)`, 'asc')
            .orderBy('Food.id', 'asc')
            .limit(5)
            .execute()
    }

    async getFoodList(foodListDto: GetFoodListFullQueryDto): Promise<GetFoodListResDto> {
        const { search, page, limit } = foodListDto

        const data = await this.db
            .selectFrom('Food')
            .select([
                'Food.id',
                'Food.description',
                sql<number>`COUNT(*) OVER()`.as('total_count'),
            ])
            .where('description', 'like', '%' + search + '%')
            .orderBy(sql`LENGTH(description)`, 'asc')
            .orderBy('Food.id', 'asc')
            .offset((page - 1) * limit)
            .limit(limit)
            .execute()

        return this.RHS.paginate(data, page, limit)
    }

    async getFoodDetails(
        foodDetailsQuery: FoodDetailsQueryDto,
    ): Promise<GetFoodDetailsDto> {
        const { id, limit, page } = foodDetailsQuery
        const foodDetails = await this.db
            .selectFrom(['Food'])
            .innerJoin('FoodNutrient', 'FoodNutrient.food_id', 'Food.id')
            .innerJoin('Nutrient', 'Nutrient.id', 'FoodNutrient.nutrient_id')
            .select([
                'Food.id',
                'Food.description',
                'Nutrient.id as nutrient_id',
                'FoodNutrient.quantity',
                'Nutrient.name',
                'Nutrient.unit_name',
                sql<number>`COUNT(*) OVER()`.as('total_count'),
            ])
            .where('Food.id', '=', id)
            .orderBy('nutrient_id')
            .offset((page - 1) * limit)
            .limit(limit)
            .execute()

        return this.RHS.paginate(foodDetails, page, limit)
    }
}
