import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger } from '@nestjs/common'
import 'dotenv/config'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Assignment')
        .addBearerAuth()
        .setDescription('The API description')
        .setVersion('1.0')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    await app.listen(process.env.PORT)
    Logger.log(
        `Server started running on http://localhost:${process.env.PORT}`,
        'Bootstrap',
    )
    Logger.log(
        `Swagger API Doc started running on http://localhost:${process.env.PORT}/api`,
        'SwaggerModule',
    )
}
bootstrap()
