import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { SpiderGuard } from '@src/common/guards/spider.guard'
import { ReqLogIntcptr } from '@src/common/interceptors/req-logging.interceptor'
import * as bootstrapConfig from '@src/app.bootstrap.config'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { isDev, ENV } from './app.config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        bootstrapConfig.app,
        { logger: ['error', 'debug'] },
    )

    app.enableCors({
        origin: (origin, callback) => {
            const allow = bootstrapConfig.hosts.some((host) => host.test(origin))
            callback(null, allow)
        },

        credentials: true,
    })

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
    app.useGlobalGuards(new SpiderGuard())

    const swaggerEndpoint = 'documentation'
    if (isDev) {
        app.useGlobalInterceptors(new ReqLogIntcptr())
        const config = new DocumentBuilder()
            .setTitle('NutriTracker Apis')
            .setDescription('Apis to interact with Nutritracker Backend')
            .setVersion('1.0')
            .addTag('APIs')
            .build()
        const documentFactory = () => SwaggerModule.createDocument(app, config)
        SwaggerModule.setup(swaggerEndpoint, app, documentFactory)
    }

    await app.listen(ENV.API_PORT, ENV.API_HOST, async () => {
        const url = await app.getUrl()
        console.log(`Server listening on: ${url}`)
        console.log(`Healthcheck route on: ${url}/api/v1/test`)
        if (isDev) console.log(`Swagger route : ${url}/${swaggerEndpoint}`)
    })
}

bootstrap()
