import * as dotenv from 'dotenv'
dotenv.config()
import { z } from 'zod'

const coerce = z.coerce
const ENVSchema = z.object({
    API_HOST: coerce.string().ip(),
    API_PORT: coerce.number(),
    DB_NAME: coerce.string(),
    DB_PORT: coerce.number(),
    DB_USER: coerce.string(),
    DB_PASS: coerce.string(),
    DB_HOST: coerce.string(),
    DB_CONN_LIMIT: coerce.number(),
    NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
    LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug', 'silly']).default('info'),
    SALT_ROUNDS: coerce.number().int().min(1).default(10),
    JWT_SECRET: coerce.string(),
    AUTH_EXPIRY: coerce.string(),
    REFRESH_EXPIRY: coerce.string(),
    // NEST_DEBUG: coerce.boolean(),
})

export const ENV = ENVSchema.parse(process.env)
export const isDev = ENV.NODE_ENV === 'dev'
export const isTest = ENV.NODE_ENV === 'test'

export const REDIS = {
    // host: argv.redis_host || 'localhost',
    // port: argv.redis_port || 6379,
    // password: argv.redis_password || null,
    ttl: null,
    httpCacheTTL: 5,
    max: 5,
    // disableApiCache: (isDev || argv.disable_cache) && !process.env['ENABLE_CACHE_DEBUG'],
}

export const SECURITY = {
    // jwtSecret: argv.jwtSecret || 'asjhczxiucipoiopiqm2376',
    jwtExpire: 7,
}

// export const AXIOS_CONFIG: AxiosRequestConfig = {
//   timeout: 10000,
// }

export const ENCRYPT = {
    key: '',
    enable: false,
    // algorithm: argv.encrypt_algorithm || 'aes-256-ecb',
}

export const CLUSTER = {
    enable: false,
    // workers: argv.cluster_workers,
}
