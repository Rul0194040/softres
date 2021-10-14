import { CreateContableDetalleDTO } from './contableDetalle.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateContableDTO {
  @ApiProperty({ nullable: false })
  insumoId: number;

  @ApiProperty()
  precioUnitario: number;

  @ApiProperty({ isArray: true })
  @IsOptional()
  detalles?: CreateContableDetalleDTO[];

  @ApiProperty({ nullable: true })
  @IsOptional()
  existencias?: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  precioMedio?: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  saldo?: number;
}
