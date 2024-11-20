import { Module, Global } from '@nestjs/common'
import { ResHelperService } from './res-help.service'

@Module({
    providers: [ResHelperService],
    exports: [ResHelperService],
})
@Global()
export class ResHelperModule {}
