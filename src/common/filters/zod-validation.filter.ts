import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { ZodError } from 'zod'
import { ZodValidationException } from '@src/common/exceptions/zod-validation.exception'

@Catch(ZodValidationException)
export class ZodValidationExceptionFilter implements ExceptionFilter {
    catch(exception: ZodValidationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<FastifyReply>()

        const zodError = exception.getResponse() as ZodError
        const firstError = zodError.errors[0]
        const error =
            'expected' in firstError
                ? `Path \`${firstError.path}\` should be \`${firstError.expected}\`, but got \`${firstError.received}\``
                : `\`${firstError.path}\`: ${firstError.message}`

        response.status(exception.getStatus()).type('application/json').send({
            error,
            message: 'Validation failed',
            statusCode: exception.getStatus(),
        })
    }
}
