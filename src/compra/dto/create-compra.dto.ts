import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PagoTypes } from '../enum/pagoTypes.enum';
import { StatusTypes } from '../enum/statusTypes.enum';
import { CreateCompraDetalleDto } from './create-detalle.dto';

export class CreateCompraDto {
  @ApiProperty({ nullable: true })
  @IsOptional()
  fecha?: Date;

  @ApiProperty({ nullable: false })
  folio: string;

  @ApiProperty({ nullable: true, default: 0.0 })
  @IsOptional()
  descuento?: number;

  @ApiProperty({
    enum: StatusTypes,
    default: StatusTypes.BORRADOR,
  })
  status?: StatusTypes;

  @ApiProperty({ nullable: false, default: 0 })
  @IsOptional()
  pagado?: boolean;

  @ApiProperty({ nullable: false, default: 0 })
  factura?: boolean;

  @ApiProperty({ nullable: false, enum: PagoTypes })
  formaPago: PagoTypes;

  @ApiProperty({ nullable: true })
  @IsOptional()
  fechaEntrega: Date;

  @ApiProperty({ nullable: false })
  proveedorId: number;

  @ApiProperty({ nullable: true, type: [CreateCompraDetalleDto] })
  @IsOptional()
  detalles?: CreateCompraDetalleDto[];
}
