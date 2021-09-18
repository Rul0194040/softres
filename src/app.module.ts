import { SolicitudDetalleEntity } from './compra/entities/solicitudDetalle.entity';
import { SolicitudEntity } from './compra/entities/solicitud.entity';
import { CotizacionDetalleEntity } from './cotizacion/entitys/cotizacionDetalle.entity';
import { CotizacionEntity } from './cotizacion/entitys/cotizacion.entity';
import { MenuEntity } from './menu/entitys/menu.entity';
import { SeccionEntity } from './menu/entitys/section.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriaEntity } from '@softres/categoria/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { CompraDetalleEntity } from './compra/entities/compraDetalles.entity';
import { CompraEntity } from './compra/entities/compra.entity';
import { CompraModule } from './compra/compra.module';
import { CompraSolicitudEntity } from './compra/entities/compraSolicitud.entity';
import { ConfigKeys } from './common/enums/configKeys.enum';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CotizacionDetalleEntity } from './cotizacion/entitys/cotizacionDetalle.entity';
import { CotizacionEntity } from './cotizacion/entitys/cotizacion.entity';
import { CotizacionModule } from './cotizacion/cotizacion.module';
import { InsumoEntity } from './insumo/insumo.entity';
import { InsumoModule } from './insumo/insumo.module';
import { MenuEntity } from './menu/entitys/menu.entity';
import { MenuModule } from './menu/menu.module';
import { Module } from '@nestjs/common';
import { ProveedorEntity } from './proveedor/entity/proveedor.entity';
import { ProveedorModule } from './proveedor/proveedor.module';
import { RateLimiterModule } from 'nestjs-rate-limiter';
import { RecetaDetalleEntity } from './receta/entities/recetaDetalle.entity';
import { RecetaEntity } from './receta/entities/receta.entity';
import { RecetaModule } from './receta/receta.module';
import { SeccionEntity } from './menu/entitys/section.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@softres/user/user.entity';
import { UserModule } from './user/user.module';
import { VentasModule } from './ventas/ventas.module';
import { CompraEntity } from './compra/entities/compra.entity';
import { CompraDetalleEntity } from './compra/entities/compraDetalles.entity';
import { AlmacenModule } from './almacen/almacen.module';
import { AlmacenEntity } from './almacen/entitys/almacen.entity';
import { AlmacenDetalleEntity } from './almacen/entitys/almacenDetalle.entity';
import { AppConfig } from './app.config';
import { CotizacionModule } from './cotizacion/cotizacion.module';

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
        entities: [
          UserEntity,
          InsumoEntity,
          CategoriaEntity,
          AlmacenEntity,
          AlmacenDetalleEntity,
          RecetaEntity,
          RecetaDetalleEntity,
          ProveedorEntity,
          CompraEntity,
          CompraDetalleEntity,
          SolicitudEntity,
          SolicitudDetalleEntity,
          SeccionEntity,
          MenuEntity,
          CotizacionEntity,
          CotizacionDetalleEntity,
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
    AuthModule,
    VentasModule,
    ProveedorModule,
    CompraModule,
    MenuModule,
    CotizacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
