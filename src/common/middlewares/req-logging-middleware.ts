import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'

@Injectable()
/**
 * @Module - Since Guard is activated before interceptor, so the request logging interceptor
 *  will not trigger in case of guard failure. This additional log will
 *  ensure that all requests get logged.
 */
export class LoggerMiddleware implements NestMiddleware {
    private logger: Logger = new Logger(LoggerMiddleware.name)

    use(req: FastifyRequest['raw'], res: FastifyReply['raw'], next: () => void) {
        this.logger.log(`+++ Incoming Request...`)
        next()
    }
}
