import { Module } from '@nestjs/common'
import { SearchController } from './nutrition.controller'
import { SearchService } from './nutrition.service'

@Module({
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
