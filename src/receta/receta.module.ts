import { AlmacenService } from './../almacen/almacen.service';
import { Module } from '@nestjs/common';
import { RecetaController } from './receta.controller';
import { RecetaService } from './receta.service';

@Module({
  controllers: [RecetaController],
  providers: [RecetaService, AlmacenService],
})
export class RecetaModule {}
