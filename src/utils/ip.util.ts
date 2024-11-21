/**
 * @module utils/ip
 */
import { IncomingMessage } from 'http'
import { FastifyRequest } from 'fastify'

export const getIp = (request: FastifyRequest | IncomingMessage) => {
    const _ = request as any

    let ip: string =
        _.headers['x-forwarded-for'] ||
        _.ip ||
        _.raw.connection.remoteAddress ||
        _.raw.socket.remoteAddress ||
        undefined

    if (ip && ip.split(',').length > 0) {
        ip = ip.split(',')[0]
    }
    return ip
}
