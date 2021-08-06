import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { AppModule } from './app.module';
import * as moduleAlias from 'module-alias';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from './common/enums/configKeys.enum';
import { readFileSync } from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

moduleAlias.addAliases({
  '@softres': path.resolve(__dirname),
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  app.disable('x-powered-by');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Authorization', 'content-type'],
  });

  //esta app estará detras de un reverse proxy en nginx
  app.set('trust proxy', 1);

  //prefijo global para todas las apis, configurado en app.module en los valores config default
  app.setGlobalPrefix(configService.get<string>(ConfigKeys.API_ROUTE));

  //obtener valores del package.json
  const appPackage = JSON.parse(readFileSync('package.json').toString());

  //preparar la generacion de la documentación del api con los valores de json
  const options = new DocumentBuilder()
    .setTitle(appPackage.name)
    .setDescription(appPackage.description)
    .setVersion(appPackage.version)
    .setContact(
      appPackage.author.name,
      appPackage.author.url,
      appPackage.author.email,
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  //ruta de acceso a la documentación del api
  SwaggerModule.setup(
    `${configService.get<string>(
      ConfigKeys.API_ROUTE,
    )}/${configService.get<string>(ConfigKeys.API_SWAGGER)}`,
    app,
    document,
  );

  //validacion pipe en todos los puntos!
  app.useGlobalPipes(new ValidationPipe());

  //logs de los requests recibidos, con morgan
  app.use(morgan(configService.get<string>(ConfigKeys.MORGAN_TYPE)));

  await app.listen(configService.get<string>(ConfigKeys.PORT));
}

bootstrap();
