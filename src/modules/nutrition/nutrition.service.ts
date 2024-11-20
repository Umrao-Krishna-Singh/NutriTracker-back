import { Injectable, Inject, Logger } from '@nestjs/common'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import {
    GetFoodItemResDto,
    GetFoodListResDto,
    GetFoodListFullQueryDto,
} from './nutrition.dto'
import { sql } from 'kysely'
import { ResHelperService } from '@src/response-helpers/res-help.service'

@Injectable()
export class NutritionService {
    private db: DatabaseType
    private readonly logger = new Logger(NutritionService.name)

    constructor(
        @Inject(DatabaseService) database: DatabaseService,
        private readonly rhs: ResHelperService,
    ) {
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

    async getFoodList(foodListDto: GetFoodListFullQueryDto): Promise<GetFoodListResDto> {
        const { search, page, limit } = foodListDto

        const data = await this.db
            .selectFrom('Food')
            .select([
                'Food.id',
                'Food.description',
                sql<number>`COUNT(*) OVER()`.as('total_count'),
            ])
            .where('Food.description', 'like', '%' + search + '%')
            .orderBy(sql`LENGTH(Food.description)`, 'asc')
            .orderBy('Food.id', 'asc')
            .offset((page - 1) * limit)
            .limit(limit)
            .execute()

        return this.rhs.paginate(data, page, limit)
    }
}
