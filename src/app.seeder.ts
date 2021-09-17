import { SolicitudEntity } from './compra/entities/solicitud.entity';
import { ProveedorEntity } from './proveedor/entity/proveedor.entity';
import { ProveedorSeeder } from './proveedor/proveedor.seeder';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { InsumosSeeder } from './insumo/insumo.seeder';
import { UserEntity } from '@softres/user/user.entity';
import { seeder } from 'nestjs-seeder';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { ConfigKeys } from './common/enums/configKeys.enum';
import { UsersSeeder } from './user/users.seeder';
import { CategoriaEntity } from './categoria/categoria.entity';
import { CategoriaSeeder } from './categoria/categorias.seeder';

seeder({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MYSQL_DB: Joi.string().required(),
        MYSQL_HOST: Joi.string().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_PORT: Joi.number().default(3306),
        MYSQL_PASSWORD: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_configService: ConfigService) => ({
        type: 'mysql',
        host: _configService.get<string>(ConfigKeys.MYSQL_HOST),
        port: parseInt(_configService.get<string>(ConfigKeys.MYSQL_PORT)),
        username: _configService.get<string>(ConfigKeys.MYSQL_USER),
        password: _configService.get<string>(ConfigKeys.MYSQL_PASSWORD),
        database: _configService.get<string>(ConfigKeys.MYSQL_DB),
        entities: [UserEntity, CategoriaEntity, InsumoEntity, ProveedorEntity],
        synchronize: false,
      }),
    }),
  ],
}).run([UsersSeeder, CategoriaSeeder, ProveedorSeeder, InsumosSeeder]);
