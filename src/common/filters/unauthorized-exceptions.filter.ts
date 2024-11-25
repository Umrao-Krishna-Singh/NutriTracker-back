import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    UnauthorizedException,
    Logger,
} from '@nestjs/common'
import { FastifyRequest, FastifyReply } from 'fastify'

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    private logger = new Logger(UnauthorizedExceptionFilter.name)

    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<FastifyReply>()
        const request = ctx.getRequest<FastifyRequest>()

        const content = `${request.method} -> ${request.url}`
        this.logger.verbose(`--- ResponseError：${content}`)

        response.status(exception.getStatus()).type('application/json').send({
            status: false,
            code: exception.getStatus(),
            message: 'Invalid User!',
        })
    }
}
