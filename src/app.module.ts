import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKeys } from './common/enums/configKeys.enum';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        //conectar a la bd
        type: 'mysql',
        host: configService.get<string>(ConfigKeys.MYSQL_HOST),
        port: parseInt(configService.get<string>(ConfigKeys.MYSQL_PORT)),
        username: configService.get<string>(ConfigKeys.MYSQL_USER),
        password: configService.get<string>(ConfigKeys.MYSQL_PASSWORD),
        database: configService.get<string>(ConfigKeys.MYSQL_DB),
        entities: [
          //aqui van las entidades que se vayan creando
        ],
        synchronize: false,
      }),
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
