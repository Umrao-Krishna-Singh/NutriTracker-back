import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    UnauthorizedException,
} from '@nestjs/common'
import { FastifyReply } from 'fastify'

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<FastifyReply>()

        response.status(exception.getStatus()).type('application/json').send({
            status: false,
            code: exception.getStatus(),
            message: 'Invalid User!',
        })
    }
}
