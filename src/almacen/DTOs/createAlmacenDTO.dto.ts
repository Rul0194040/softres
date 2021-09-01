import { Deptos } from './../enums/deptos.enum';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AlmacenType } from '../enums/almacenTypes.enum';
import { CreateDetalleDTO } from './createDetalleDTO.dto';

export class CreateAlmacenDTO {
  @ApiProperty()
  insumoId: number;
  @ApiProperty()
  capacidad: number;
  @ApiProperty()
  cantidad: number;
  @ApiProperty()
  total?: number;
  @ApiProperty()
  @IsOptional()
  depto?: Deptos;
  @ApiProperty()
  @IsOptional()
  type?: AlmacenType;
  @ApiProperty()
  @IsOptional()
  insumo?: InsumoEntity;
  @ApiProperty()
  @IsOptional()
  detalles?: CreateDetalleDTO[];
}
