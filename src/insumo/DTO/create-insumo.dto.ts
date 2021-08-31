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
  @IsOptional()
  medida?: MedidasTypes;
  @ApiProperty()
  marca: string;
  @ApiProperty()
  precioUnitario: number;
  @ApiProperty()
  precioKilo: number;
  @ApiProperty()
  pesoNeto: number;
  @ApiProperty()
  @ApiProperty()
  pesoDrenado?: number;
  @ApiProperty()
  @ApiProperty()
  merma?: number;
  @ApiProperty()
  mermaPorcentaje: number;
  @ApiProperty()
  categoriaId: number;
}
