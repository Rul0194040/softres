import { CreateContableDTO } from './createContable.dto';
import { Deptos } from '../enums/deptos.enum';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AlmacenType } from '../enums/almacenTypes.enum';
import { CreateDetalleRecetaDTO } from '@softres/receta/DTO/create-receta.dto';
import { CreateContableDetalleDTO } from './contableDetalle.dto';

export class CreateAlmacenDTO {
  @ApiProperty({ nullable: true })
  @IsOptional()
  insumo?: InsumoEntity;
  @ApiProperty()
  insumoId: number;
  @ApiProperty()
  minimo: number;
  @ApiProperty()
  maximo: number;
  @ApiProperty({ nullable: true, default: 0.0 })
  cantidad: number;
  @ApiProperty({ nullable: true, default: 0.0 })
  @IsOptional()
  total?: number;
  @ApiProperty({ enum: Deptos })
  depto: Deptos;
  @ApiProperty({ enum: AlmacenType })
  type: AlmacenType;
  @ApiProperty({ nullable: true, type: [CreateContableDetalleDTO] })
  detalleContable?: CreateContableDetalleDTO[];
}
