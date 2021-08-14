import { Module } from '@nestjs/common';
import { InsumoService } from './insumo.service';
import { InsumoController } from './insumo.controller';

@Module({
  providers: [InsumoService],
  controllers: [InsumoController],
})
export class InsumoModule {}
