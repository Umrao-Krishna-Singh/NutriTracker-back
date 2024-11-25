import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    ForbiddenException,
    Logger,
} from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
    private logger = new Logger(ForbiddenExceptionFilter.name)

    catch(exception: ForbiddenException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<FastifyReply>()
        const request = ctx.getRequest<FastifyRequest>()

        const content = `${request.method} -> ${request.url}`
        this.logger.verbose(`--- ResponseError：${content}`)

        response.status(exception.getStatus()).type('application/json').send({
            status: false,
            code: exception.getStatus(),
            message: 'Unauthorized access',
        })
    }
}
