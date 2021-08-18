import { MedidasTypes } from './../enums/medidasTypes.enum';
import { ApiProperty } from '@nestjs/swagger';
import { UnidadesTypes } from '../enums/unidadesTypes.enum';

export class CreateInsumoDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  unidad: UnidadesTypes;
  @ApiProperty()
  medida: MedidasTypes;
  @ApiProperty()
  marca: string;
  @ApiProperty()
  precioUnitario: number;
  @ApiProperty()
  categoriaId: number;
}
