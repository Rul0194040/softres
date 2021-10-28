import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { StatusTypes } from '../enum/statusTypes.enum';
import { CreateCompraDetalleDTO } from './create-detalle.dto';

export class CreateCompraDTO {
  @ApiProperty({ nullable: true })
  @IsOptional()
  fecha?: Date;

  @ApiProperty({ nullable: false })
  folio: string;

  @ApiProperty({
    enum: StatusTypes,
    default: StatusTypes.EN_ESPERA,
  })
  @IsOptional()
  status?: StatusTypes;

  @ApiProperty({ nullable: false })
  cotizacionId: number;

  @ApiProperty()
  compraId: number;

  @ApiProperty({ nullable: true, type: [CreateCompraDetalleDTO] })
  @IsOptional()
  detalles?: CreateCompraDetalleDTO[];
}
