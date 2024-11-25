import { ExceptionFilter, Catch, ArgumentsHost, ForbiddenException } from '@nestjs/common'
import { FastifyReply } from 'fastify'

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
    catch(exception: ForbiddenException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<FastifyReply>()

        response.status(exception.getStatus()).type('application/json').send({
            status: false,
            code: exception.getStatus(),
            message: 'Unauthorized access',
        })
    }
}
