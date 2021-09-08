import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCompraDetalleDto {
  @ApiProperty({ nullable: false })
  cantidad: number;

  @ApiProperty({ nullable: false })
  insumoId: number;

  @ApiProperty({ nullable: false })
  compraId: number;
}
