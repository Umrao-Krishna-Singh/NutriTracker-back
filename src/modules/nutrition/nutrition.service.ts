import { Injectable, Inject, Logger } from '@nestjs/common'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import { GetFoodItemResDto } from './nutrition.dto'
import { sql } from 'kysely'
@Injectable()
export class NutritionService {
    private db: DatabaseType
    private readonly logger = new Logger(NutritionService.name)

    constructor(@Inject(DatabaseService) database: DatabaseService) {
        this.db = database.db()
    }

    async getFoodListSuggest(search: string): Promise<GetFoodItemResDto[]> {
        return await this.db
            .selectFrom('Food')
            .select(['Food.id', 'Food.description'])
            .where('Food.description', 'like', '%' + search + '%')
            .orderBy(sql`LENGTH(Food.description)`, 'asc')
            .orderBy('Food.id', 'asc')
            .limit(5)
            .execute()
    }

    async getFoodList(search: string): Promise<GetFoodItemResDto[]> {
        return await this.db
            .selectFrom('Food')
            .select(['Food.id', 'Food.description'])
            .where('Food.description', 'like', '%' + search + '%')
            .orderBy(sql`LENGTH(Food.description)`, 'asc')
            .orderBy('Food.id', 'asc')
            .execute()
    }
}
