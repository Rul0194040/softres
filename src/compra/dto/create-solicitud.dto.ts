import { Deptos } from './../../almacen/enums/deptos.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateSolicitudDetallesDTO {
  @ApiProperty({ nullable: false })
  cantidad: number;
  @ApiProperty({ nullable: false })
  insumoId: number;
}

export class CreateSolicitudDTO {
  @ApiProperty({ nullable: true })
  @IsOptional()
  usuarioId?: number;

  @ApiProperty({ nullable: true })
  fecha?: Date;

  @ApiProperty({ nullable: true, enum: Deptos })
  @IsOptional()
  depto?: Deptos;

  @ApiProperty({ nullable: false, type: [CreateSolicitudDetallesDTO] })
  detalle: CreateSolicitudDetallesDTO[];
}
