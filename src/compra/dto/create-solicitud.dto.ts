import { ApiProperty } from '@nestjs/swagger';
import { StatusTypes } from '../enum/statusTypes.enum';
import { CreateCompraDto } from './create-compra.dto';

export class CreateCompraSolicitudDto {
  @ApiProperty({ nullable: true })
  fecha?: Date;

  @ApiProperty({ nullable: false })
  folio: string;

  @ApiProperty({ nullable: true })
  total?: number;

  @ApiProperty({
    nullable: false,
    enum: StatusTypes,
    default: StatusTypes.BORRADOR,
  })
  status: StatusTypes;

  @ApiProperty({ nullable: true, type: [CreateCompraDto] })
  detalles?: CreateCompraDto[];
}
