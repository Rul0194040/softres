import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateDetalleDTO {
  @ApiProperty({ nullable: true })
  @IsOptional()
  fecha?: Date;

  @ApiProperty({ nullable: true })
  @IsOptional()
  referencia?: string;

  @ApiProperty({ nullable: true })
  @IsOptional()
  entradas?: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  salidas?: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  existencias?: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  precioMedio?: number;

  @ApiProperty()
  precioUnitario?: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  cargo?: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  abono?: number;

  @ApiProperty({ nullable: true })
  @IsOptional()
  saldo?: number;

  @ApiProperty()
  almacenId: number;
}
