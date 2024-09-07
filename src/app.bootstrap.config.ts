import { FastifyAdapter } from '@nestjs/platform-fastify'

const FASTIFY_OPTIONS = {
    trustProxy: true,
    ignoreTrailingSlash: true,
    connectionTimeout: 60000,
}

export const app: FastifyAdapter = new FastifyAdapter(FASTIFY_OPTIONS)

app.getInstance().addHook('onRequest', (request, reply, done) => {
    // set undefined origin
    const origin = request.headers.origin
    if (!origin) request.headers.origin = request.headers.host

    const url = request.url

    // forbidden php
    if (url.endsWith('.php')) {
        reply.raw.statusMessage = 'You shall not pass!'
        return reply.code(418).send()
    }

    // skip favicon request
    if (url.match(/favicon.ico$/) || url.match(/manifest.json$/))
        return reply.code(204).send()

    done()
})

const CROSS_DOMAIN = {
    allowedOrigins: ['127.0.0.1', 'localhost'],
    // allowedReferer: 'innei.in',
}

const Origin = CROSS_DOMAIN.allowedOrigins
export const hosts = Origin.map((host) => new RegExp(host, 'i'))
