import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateContableDetalleDTO {
  @ApiProperty()
  fecha?: Date;
  @ApiProperty()
  @IsOptional()
  referencia?: string;
  @ApiProperty()
  entradas?: number;
  @ApiProperty()
  salidas?: number;
  @ApiProperty()
  cargo?: number;
  @ApiProperty()
  abono?: number;
  @ApiProperty()
  @IsOptional()
  existencias?: number;
  @ApiProperty()
  @IsOptional()
  precioUnitario?: number;
  @ApiProperty()
  @IsOptional()
  precioMedio?: number;
  @ApiProperty()
  @IsOptional()
  saldo?: number;
  @ApiProperty({ nullable: true })
  @IsOptional()
  contableId?: number;
}
