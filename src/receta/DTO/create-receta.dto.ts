import { GrupoReceta } from './../enums/grupoReceta.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateRecetaDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  grupo: GrupoReceta;
  @ApiProperty()
  numPorciones?: number;
  @ApiProperty()
  numXporcion?: number;
  @ApiProperty()
  hasChildren: boolean;
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
  children?: number[];
  @ApiProperty()
  @IsOptional()
  detalles?: CreateDetalleRecetaDTO[];
}

export class CreateDetalleRecetaDTO {
  @ApiProperty()
  cantReceta: number;
  @ApiProperty()
  @IsOptional()
  cantReal?: number;
  @ApiProperty()
  insumoId: number;
  @ApiProperty()
  @IsOptional()
  rendimiento?: number;
}
