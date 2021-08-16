import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AlmacenType } from '../enums/almacenTypes.enum';
import { CreateDetalleDTO } from './createDetalleDTO.dto';

export class CreateAlmacenDTO {
  @ApiProperty()
  type: AlmacenType;
  @ApiProperty()
  insumo: InsumoEntity;
  @ApiProperty()
  @IsOptional()
  insumoId?: number;
  @ApiProperty()
  factor: number;
  @ApiProperty()
  @IsOptional()
  precioVenta?: number;
  @ApiProperty()
  @IsOptional()
  total?: number;
  @ApiProperty()
  @IsOptional()
  detalles?: CreateDetalleDTO[];
}
