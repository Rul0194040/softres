import { AlmacenService } from './../almacen/almacen.service';
import { Module } from '@nestjs/common';
import { RecetaController } from './receta.controller';
import { RecetaService } from './receta.service';
import { DashboardService } from '@softres/dashboard/dashboard.service';

@Module({
  controllers: [RecetaController],
  providers: [RecetaService, AlmacenService, DashboardService],
})
export class RecetaModule {}
