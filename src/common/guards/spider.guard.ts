/**
 * @module common/guard/spider.guard
 * @description Guard against web crawlers
 * @author  Innei <https://innei.in>
 * @author  Umrao <https://github.com/Umrao-Krishna-Singh>
 */
import { Observable } from 'rxjs'

import { isDev } from '@src/app.config'
import { getNestExecutionContextRequest } from '@src/utils/req-type.util'
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common'

type activationType = boolean | Promise<boolean> | Observable<boolean>

@Injectable()
export class SpiderGuard implements CanActivate {
    canActivate(context: ExecutionContext): activationType {
        if (isDev) return true

        const request = this.getRequest(context)
        const headers = request.headers
        const ua: string = headers['user-agent'] || ''

        const isSpiderUA =
            !!ua.match(/(Scrapy|HttpClient|axios|python|requests)/i) &&
            !ua.match(/(mx-space|rss|google|baidu|bing)/gi)

        if (ua && !isSpiderUA) return true

        throw new ForbiddenException(`Crawling prohibited，UA: ${ua}`)
    }

    getRequest(context: ExecutionContext) {
        return getNestExecutionContextRequest(context)
    }
}
