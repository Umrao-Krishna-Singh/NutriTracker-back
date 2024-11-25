import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_REQUEST_TIME } from '@src/constants/http.constant'
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { getIp } from '@src/utils/ip.util'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name)
    constructor(private reflector: Reflector) {}
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<FastifyReply>()
        const request = ctx.getRequest<FastifyRequest>()

        if (request.method === 'OPTIONS') return response.status(HttpStatus.OK).send()

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR

        const message = (exception as any)?.response?.message || 'Internal server error'
        const url = decodeURI(request.raw.url!)

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) this.logger.error(exception)
        else {
            const ip = getIp(request)
            const logMessage = `IP: ${ip} Error Info: (${status}) ${message} Path: ${url}`
            this.logger.error(logMessage)
        }

        const prevRequestTs = this.reflector.get(HTTP_REQUEST_TIME, request as any)

        if (prevRequestTs) {
            const content = `${request.method} -> ${request.url}`
            const prevReq = `${content} +${+new Date() - prevRequestTs}ms,`
            this.logger.error(`--- ResponseError：${prevReq}`)
        }

        response
            .status(status)
            .type('application/json')
            .send({
                status: false,
                code: (exception as any)?.response?.code || status,
                message:
                    status !== HttpStatus.INTERNAL_SERVER_ERROR
                        ? message
                        : 'Internal server error',
            })
    }
}
