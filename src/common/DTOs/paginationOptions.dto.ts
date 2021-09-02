import { ApiProperty } from '@nestjs/swagger';
import { AlmacenType } from '@softres/almacen/enums/almacenTypes.enum';
import { Deptos } from '@softres/almacen/enums/deptos.enum';
import { IsIn, IsOptional } from 'class-validator';

export class PaginationOptions {
  /**
   * @ignore
   */
  @ApiProperty()
  sort: any;

  @ApiProperty({
    default: 'ASC',
  })
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  direction?: 'ASC' | 'DESC';

  /**
   * @ignore
   */
  @ApiProperty({
    description: 'Resultados que la paginación se saltará',
    default: 0,
  })
  skip: number;
  /**
   * @ignore
   */
  @ApiProperty({
    description: 'Resultados que la paginación mostrará',
    default: 10,
  })
  take: number;
  /**
   * @ignore
   */
  @ApiProperty()
  filters: {
    buscar?: string;
    depto?: Deptos;
    type?: AlmacenType;
  };
}
