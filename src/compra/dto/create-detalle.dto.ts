import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCompraDetalleDto {
  @ApiProperty({ nullable: false })
  cantidad: number;

  @ApiProperty({ nullable: true, default: 0.0 })
  @IsOptional()
  descuento?: number;

  @ApiProperty({ nullable: true, default: 0.0 })
  @IsOptional()
  total?: number;

  @ApiProperty({ nullable: false })
  insumoId: number;
}
