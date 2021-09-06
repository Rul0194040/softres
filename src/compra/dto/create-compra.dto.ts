import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
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
    nullable: true,
    enum: StatusTypes,
    default: StatusTypes.BORRADOR,
  })
  @IsOptional()
  status?: StatusTypes;

  @ApiProperty({ nullable: true })
  @IsOptional()
  total?: number;

  @ApiProperty({ nullable: true, default: 0 })
  @IsOptional()
  pagado?: boolean;

  @ApiProperty({ nullable: false })
  proveedorId: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  detalles?: CreateCompraDetalleDto[];
}
