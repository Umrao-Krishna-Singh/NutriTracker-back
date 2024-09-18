import { Module } from '@nestjs/common'
import { HealthCheckModule } from '@src/modules/healthcheck/healthcheck.module'
import { SearchModule } from '@src/modules/search/search.module'
import { DatabaseModule } from '@src/database/db.module'
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston'
import * as winston from 'winston'
import { ZodValidationExceptionFilter } from '@src/common/filters/zod-validation.filter'
// import { AllExceptionsFilter } from '@src/common/filters/all-exceptions.filter'
import { TransformInterceptor } from '@src/common/interceptors/res-transform.interceptor'
import { ENV } from '@src/app.config'
import {
    APP_FILTER,
    // APP_GUARD,
    APP_INTERCEPTOR,
    // APP_PIPE,
    // HttpAdapterHost,
} from '@nestjs/core'
// import { ThrottlerGuard } from '@nestjs/throttler'

const debugFilter = winston.format((info, opts) => {
    if (opts?.invert) return info.level !== 'debug' ? info : false
    return info.level === 'debug' ? info : false
})

@Module({
    imports: [
        WinstonModule.forRoot({
            level: ENV.LOG_LEVEL,
            format: winston.format.combine(
                winston.format.errors({ stack: true }),
                winston.format.timestamp(),
                winston.format.json(),
            ),
            transports: [
                //log all errors into error.log file
                new winston.transports.File({
                    format: winston.format.combine(
                        winston.format.errors({ stack: true }),
                        winston.format.timestamp(),
                        winston.format.json(),
                    ),
                    filename: './storage/error.log',
                    level: 'error',
                }),

                //console prints for all levels except debug
                new winston.transports.Console({
                    format: winston.format.combine(
                        debugFilter({ invert: true }),
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike('NutriTracker', {
                            colors: true,
                            prettyPrint: true,
                            processId: true,
                            appName: true,
                        }),
                    ),
                }),

                //debug console prints for development
                new winston.transports.Console({
                    format: winston.format.combine(
                        debugFilter(),
                        winston.format.prettyPrint({ colorize: true, depth: 6 }),
                    ),
                }),
            ],
        }),
        DatabaseModule,
        HealthCheckModule,
        SearchModule,
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
        // { provide: APP_FILTER, useClass: AllExceptionsFilter },
        { provide: APP_FILTER, useClass: ZodValidationExceptionFilter },
    ],
    exports: [WinstonModule],
})
export class AppModule {}
