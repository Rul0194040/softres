import { Module } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { ProveedorController } from './proveedor.controller';

@Module({
  providers: [ProveedorService],
  controllers: [ProveedorController],
})
export class ProveedorModule {}
