import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateDetalleDTO {
  @ApiProperty()
  @IsOptional()
  fecha?: Date;

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
  existencias?: number;

  @ApiProperty()
  almacenId: number;

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
