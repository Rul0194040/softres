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
import { AuthModule } from './common/auth/auth.module';
import { VentasModule } from './ventas/ventas.module';

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
