import { ApiProperty } from '@nestjs/swagger';
import { CreateCompraDto } from './create-compra.dto';

export class CreateCompraSolicitudDto {
  @ApiProperty({ nullable: true })
  fecha: Date;

  @ApiProperty({ nullable: false })
  folio: string;

  @ApiProperty({ nullable: true, type: [CreateCompraDto] })
  detalles: CreateCompraDto[];
}
