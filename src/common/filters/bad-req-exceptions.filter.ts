import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
    Logger,
} from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    private logger = new Logger(BadRequestExceptionFilter.name)

    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<FastifyReply>()
        const request = ctx.getRequest<FastifyRequest>()
        const message = (exception as any)?.message || 'Bad Request'

        const content = `${request.method} -> ${request.url} || ${message}`
        this.logger.verbose(`--- ResponseError：${content}`)

        response.status(exception.getStatus()).type('application/json').send({
            status: false,
            code: exception.getStatus(),
            message,
        })
    }
}
