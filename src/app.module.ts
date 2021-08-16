import { UserEntity } from '@softres/user/user.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKeys } from './common/enums/configKeys.enum';
import { UserModule } from './user/user.module';
import { InsumoModule } from './insumo/insumo.module';
import { CategoriaModule } from './categoria/categoria.module';
import { RecetaModule } from './receta/receta.module';
import { MenuModule } from './menu/menu.module';
import { AlmacenModule } from './almacen/almacen.module';
import { ComprasModule } from './compras/compras.module';
import { VentasModule } from './ventas/ventas.module';
import { AuthModule } from './auth/auth.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { AppConfig } from './app.config';
import { InsumoEntity } from './insumo/insumo.entity';

@Module({
  imports: [
    RateLimiterModule.register({
      points: 360,
      duration: 60,
      whiteList: ['127.0.0.1', '::1', '::ffff:127.0.0.1'],
      maxQueueSize: 300,
      errorMessage: 'Ha sobrepasado el limite de solicitudes',
    }),
    //cargar configuracion de .env
    ConfigModule.forRoot(AppConfig),
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
        entities: [UserEntity, InsumoEntity],
        synchronize: false,
      }),
    }),
    ConfigModule.forRoot(),
    UserModule,
    InsumoModule,
    CategoriaModule,
    RecetaModule,
    MenuModule,
    AlmacenModule,
    ComprasModule,
    AuthModule,
    VentasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
