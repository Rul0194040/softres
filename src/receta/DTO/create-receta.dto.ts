import { Deptos } from './../../almacen/enums/deptos.enum';
import { GrupoReceta } from './../enums/grupoReceta.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateDetalleRecetaDTO {
  @ApiProperty()
  insumoId: number;
  @ApiProperty()
  cantReceta: number;
  @ApiProperty()
  @IsOptional()
  cantReal?: number;
  @ApiProperty()
  @IsOptional()
  rendimiento?: number;
}

export class CreateRecetaDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty({ enum: Deptos })
  departamento: Deptos;
  @ApiProperty({ enum: GrupoReceta })
  grupo: GrupoReceta;
  @ApiProperty()
  hasChildren: boolean;
  @ApiProperty()
  numPorciones?: number;
  @ApiProperty()
  numXporcion?: number;
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
  @ApiProperty({ nullable: true })
  @IsOptional()
  imagen?: string;
  @ApiProperty({ type: [Number] })
  @IsOptional()
  children?: number[];
  @ApiProperty({ nullable: false, type: [CreateDetalleRecetaDTO] })
  detalles?: CreateDetalleRecetaDTO[];
}
