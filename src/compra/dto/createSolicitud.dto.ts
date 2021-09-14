import { Deptos } from './../../almacen/enums/deptos.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSolicitudDTO {
  @ApiProperty({ nullable: true })
  fecha?: Date;

  @ApiProperty({ nullable: false })
  folio: string;

  @ApiProperty({ nullable: false, enum: Deptos })
  depto: Deptos;

  @ApiProperty({ nullable: false })
  insumos: number[];
}
