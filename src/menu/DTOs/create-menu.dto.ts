import { ApiProperty } from '@nestjs/swagger';
import { CreateSeccionDTO } from './create-seccion.dto';

export class CreateMenuDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty({ type: CreateSeccionDTO })
  secciones: CreateSeccionDTO[];
}
