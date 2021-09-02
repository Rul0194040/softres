import { MedidasTypes } from './../enums/medidasTypes.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UnidadesTypes } from '../enums/unidadesTypes.enum';
import { IsOptional } from 'class-validator';

export class CreateInsumoDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  unidad: UnidadesTypes;
  @ApiProperty()
  marca: string;
  @ApiProperty()
  precioUnitario: number;
  @ApiProperty()
  @IsOptional()
  precioKilo: number;
  @ApiProperty()
  pesoNeto: number;
  @ApiProperty()
  mermaPorcentaje: number;
  @ApiProperty()
  categoriaId: number;
  @ApiProperty()
  proveedorId: number;
  @ApiProperty()
  @IsOptional()
  pesoDrenado?: number;
  @ApiProperty()
  @IsOptional()
  merma?: number;
  @ApiProperty()
  @IsOptional()
  medida?: MedidasTypes;
  @ApiProperty()
  @IsOptional()
  subCategoriaId?: number;
}
