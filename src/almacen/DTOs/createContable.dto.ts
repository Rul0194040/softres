import { CreateContableDetalleDTO } from './contableDetalle.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateContableDTO {
  @ApiProperty({ nullable: false })
  insumoId: number;

  @ApiProperty({ isArray: true })
  @IsOptional()
  detalles?: CreateContableDetalleDTO[];
}
