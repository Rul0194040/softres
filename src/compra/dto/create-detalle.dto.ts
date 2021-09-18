import { ApiProperty } from '@nestjs/swagger';
import { ProveedorEntity } from '@softres/proveedor/entity/proveedor.entity';
import { IsOptional } from 'class-validator';

export class CreateCompraDetalleDTO {
  @ApiProperty({ nullable: false })
  cantidad: number;

  @ApiProperty({ nullable: false })
  insumoId: number;

  @ApiProperty({ nullable: true })
  compraId?: number;

  @ApiProperty()
  proveedor: ProveedorEntity;

  @ApiProperty()
  proveedorId: number;

  @ApiProperty()
  total: number;
}
