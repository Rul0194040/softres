import { ApiProperty } from '@nestjs/swagger';
import { Deptos } from '@softres/almacen/enums/deptos.enum';
import { CreateSeccionDTO } from './create-seccion.dto';

export class CreateMenuDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty({ enum: Deptos })
  departamento: Deptos;
  @ApiProperty({ type: CreateSeccionDTO })
  secciones: CreateSeccionDTO[];
}
