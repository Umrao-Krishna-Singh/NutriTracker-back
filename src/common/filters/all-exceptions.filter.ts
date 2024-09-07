import { FastifyReply, FastifyRequest } from 'fastify'
import { HTTP_REQUEST_TIME } from '@src/constants/http.constant'
import { REFLECTOR } from '@src/constants/system.constant'
import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Inject,
    Logger,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { getIp } from '@src/utils/ip.util'
import { RequestLoggingInterceptor } from '../interceptors/req-logging.interceptor'

type myError = {
    readonly status: number
    readonly statusCode?: number
    readonly message?: string
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name)
    constructor(@Inject(REFLECTOR) private reflector: Reflector) {}
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<FastifyReply>()
        const request = ctx.getRequest<FastifyRequest>()

        if (request.method === 'OPTIONS') {
            return response.status(HttpStatus.OK).send()
        }

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : (exception as myError)?.status ||
                  (exception as myError)?.statusCode ||
                  HttpStatus.INTERNAL_SERVER_ERROR

        const message =
            (exception as any)?.response?.message ||
            (exception as myError)?.message ||
            'Internal Server Error'

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
            this.logger.verbose(
                `--- ResponseError：`,
                prevReq,
                RequestLoggingInterceptor.name,
            )
        }

        const res = (exception as any).response

        response
            .status(status)
            .type('application/json')
            .send({
                ok: 0,
                code: res?.code || status,
                chMessage: res?.chMessage,
                message:
                    (exception as any)?.response?.message ||
                    (exception as any)?.message ||
                    'Unknown Error',
            })
    }
}
