import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateRecetaDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  @IsOptional()
  costoTotal?: number;
  @ApiProperty()
  @IsOptional()
  costoUnitarioReceta?: number;
  @ApiProperty()
  @IsOptional()
  factorAlimentos?: number;
  @ApiProperty()
  @IsOptional()
  costoIva?: number;
  @ApiProperty()
  @IsOptional()
  costoSinIva?: number;
  @ApiProperty()
  @IsOptional()
  precioSugeridoCarta?: number;
  @ApiProperty()
  @IsOptional()
  subReceta?: boolean;
  @ApiProperty()
  @IsOptional()
  children?: number[];
  @ApiProperty()
  @IsOptional()
  detalles?: CreateDetalleRecetaDTO[];
}

export class CreateDetalleRecetaDTO {
  @ApiProperty()
  cantReal: number;
  @ApiProperty()
  insumoId: number;
  @ApiProperty()
  @IsOptional()
  rendimiento?: number;
  @ApiProperty()
  @IsOptional()
  numPorciones?: number;
  @ApiProperty()
  @IsOptional()
  numXporcion?: number;
  @ApiProperty()
  @IsOptional()
  cantReceta?: number;
}
