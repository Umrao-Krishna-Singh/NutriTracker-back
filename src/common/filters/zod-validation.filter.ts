import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { ZodValidationException } from '@src/common/exceptions/zod-validation.exception'
import { Reflector } from '@nestjs/core'
import { HTTP_REQUEST_TIME } from '@src/constants/http.constant'

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
    private logger = new Logger(ZodValidationExceptionFilter.name)
    constructor(private reflector: Reflector) {}

    catch(exception: ZodValidationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<FastifyReply>()
        const request = ctx.getRequest<FastifyRequest>()

        const zodError = exception.getResponse() as ZodError
        const firstError = zodError.errors[0]
        const error =
            'expected' in firstError
                ? `Path \`${firstError.path}\` should be \`${firstError.expected}\`, but got \`${firstError.received}\``
                : `\`${firstError.path}\`: ${firstError.message}`

        const prevRequestTs = this.reflector.get(HTTP_REQUEST_TIME, request as any)

        if (prevRequestTs) {
            const content = `${request.method} -> ${request.url}`
            const prevReq = `${content} +${+new Date() - prevRequestTs}ms,`
            this.logger.verbose(`--- ResponseError：${prevReq}`)
        }

        response.status(exception.getStatus()).type('application/json').send({
            status: false,
            code: exception.getStatus(),
            message: error,
        })
    }
}
