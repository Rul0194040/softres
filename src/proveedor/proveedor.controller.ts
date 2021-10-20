import { ProveedorService } from './proveedor.service';
import { Controller, Get } from '@nestjs/common';
import { ProveedorEntity } from './entity/proveedor.entity';

@Controller('proveedor')
export class ProveedorController {
  constructor(private readonly proveedorService: ProveedorService) {}

  /**
   *retorna un array de objetos proveedor
   * @returns {ProveedorEntity[]}
   */
  @Get('proveedores')
  getProveedores(): Promise<ProveedorEntity[]> {
    return this.proveedorService.getProveedores();
  }
}
