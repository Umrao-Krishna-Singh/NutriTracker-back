/**
 * Logging interceptor.
 * @module interceptor/logging
 * @author Surmon <https://github.com/surmon-china>
 * @author Innei <https://github.com/Innei>
 */
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { HTTP_REQUEST_TIME } from '../../constants/http.constant'
import { isDev } from '@src/app.config'
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
    SetMetadata,
} from '@nestjs/common'

@Injectable()
export class ReqLogIntcptr implements NestInterceptor {
    private logger: Logger = new Logger(ReqLogIntcptr.name)

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const call$ = next.handle()
        if (!isDev) return call$
        const request = this.getRequest(context)

        const content = `${request.method} -> ${request.url}`
        this.logger.verbose(`+++ Request：${content}`, ReqLogIntcptr.name)

        const now = +new Date()
        SetMetadata(HTTP_REQUEST_TIME, now)(this.getRequest(context))

        return call$.pipe(
            tap(() =>
                this.logger.verbose(`--- Response：${content} +${+new Date() - now}ms`),
            ),
        )
    }

    getRequest(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()
        if (req) return req
    }
}
