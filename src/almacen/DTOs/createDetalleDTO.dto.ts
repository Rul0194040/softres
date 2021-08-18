import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Deptos } from '../enums/deptos.enum';

export class CreateDetalleDTO {
  @ApiProperty()
  depto: Deptos;

  @ApiProperty()
  fecha: Date;

  @ApiProperty()
  referencia: string;

  @ApiProperty()
  precioUnitario: number;

  @ApiProperty()
  @IsOptional()
  entradas?: number;

  @ApiProperty()
  @IsOptional()
  salidas?: number;

  @ApiProperty()
  @IsOptional()
  almacenId?: number;

  @ApiProperty()
  @IsOptional()
  precioMedio?: number;

  @ApiProperty()
  @IsOptional()
  cargo?: number;

  @ApiProperty()
  @IsOptional()
  abono?: number;

  @ApiProperty()
  @IsOptional()
  saldo?: number;
}
