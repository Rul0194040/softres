import { Deptos } from './../../almacen/enums/deptos.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSolicitudDetallesDTO {
  @ApiProperty({ nullable: false })
  cantidad: number;
  @ApiProperty({ nullable: false })
  insumoId: number;
  @ApiProperty({ nullable: false })
  solicitudId: number;
}

export class CreateSolicitudDTO {
  @ApiProperty({ nullable: false })
  usuarioId: number;

  @ApiProperty({ nullable: true })
  fecha?: Date;

  @ApiProperty({ nullable: false })
  folio: string;

  @ApiProperty({ nullable: false, enum: Deptos })
  depto: Deptos;

  @ApiProperty({ nullable: false, type: [Number] })
  insumos: number[];

  @ApiProperty({ nullable: false, type: [CreateSolicitudDetallesDTO] })
  detalles: CreateSolicitudDetallesDTO[];
}
