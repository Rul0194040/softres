import { ApiProperty } from '@nestjs/swagger';
import { TypesUnides } from '../typesUnidades.enum';

export class CreateInsumoDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  unidad: TypesUnides;
  @ApiProperty()
  marca: string;
}
