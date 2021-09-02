import { MedidasTypes } from './../enums/medidasTypes.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UnidadesTypes } from '../enums/unidadesTypes.enum';
import { IsOptional } from 'class-validator';

export class CreateInsumoDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  unidad: UnidadesTypes;
  @ApiProperty({ required: false })
  medida?: MedidasTypes;
  @ApiProperty()
  marca: string;
  @ApiProperty()
  precioUnitario: number;
  @ApiProperty({ required: false })
  precioKilo: number;
  @ApiProperty()
  pesoNeto: number;
  @ApiProperty({ required: false })
  pesoDrenado?: number;
  @ApiProperty({ required: false })
  merma?: number;
  @ApiProperty()
  mermaPorcentaje: number;
  @ApiProperty()
  categoriaId: number;
  @ApiProperty({ required: false })
  @IsOptional()
  subCategoriaId?: number;
}
