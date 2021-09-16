import { Deptos } from './../../almacen/enums/deptos.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSolicitudDTO {
  @ApiProperty({ nullable: false })
  usuarioId: number;

  @ApiProperty({ nullable: true })
  fecha?: Date;

  @ApiProperty({ nullable: false })
  folio: string;

  @ApiProperty({ nullable: false, enum: Deptos })
  depto: Deptos;

  @ApiProperty({ nullable: false })
  insumos: number[];

  @ApiProperty({ nullable: false })
  detalles: CreateSolicitudDetallesDTO[];
}

export class CreateSolicitudDetallesDTO {
  @ApiProperty({ nullable: false })
  cantidad: number;
  @ApiProperty({ nullable: false })
  insumoId: number;
  @ApiProperty({ nullable: false })
  solicitudId: number;
}
