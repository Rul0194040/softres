import { CreateDetalleDTO } from './DTOs/createDetalleDTO.dto';
import { AlmacenInformeDTO } from './DTOs/almacenInforneDTO.dto';
import { AlmacenService } from './almacen.service';
import { AlmacenEntity } from './entitys/almacen.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateAlmacenDTO } from './DTOs/createAlmacenDTO.dto';
import { UpdateAlmacenDTO } from './DTOs/updateAlmacenDTO.dto';
import { almacenDetalleEntity } from './entitys/almacenDetalle.entity';

@Controller('almacen')
export class AlmacenController {
  constructor(private readonly almacenService: AlmacenService) {}

  @Post()
  createAlmacen(
    @Body() almacen: CreateAlmacenDTO,
  ): Promise<AlmacenInformeDTO | AlmacenEntity> {
    return this.almacenService.create(almacen);
  }

  @Post('createDetalle/:almacenId')
  createDetAlmacen(
    @Param('almacenId', ParseIntPipe) almacenId: number,
    @Body() almacen: CreateDetalleDTO[],
  ): Promise<almacenDetalleEntity[]> {
    return this.almacenService.createDetalle(almacenId, almacen);
  }

  @Get(':id')
  GetAlmacenById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AlmacenEntity> {
    return this.almacenService.getByid(id);
  }

  @Put(':id')
  updateAlmacen(
    @Param('id', ParseIntPipe) id: number,
    @Body() almacen: UpdateAlmacenDTO,
  ): Promise<UpdateResult> {
    return this.almacenService.update(id, almacen);
  }

  @Delete(':id')
  deleteAlmacen(@Param('id') id: number): Promise<DeleteResult> {
    return this.almacenService.delete(id);
  }

  /**
   * Paginate fisico
   *
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult}
   */
  @Post('paginate')
  paginate(
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.almacenService.paginate(options);
  }

  /**
   * Paginate contable
   *
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult}
   */
  @Post('paginate/contable/:insumoId')
  paginateContable(
    @Param('insumoId', ParseIntPipe) insumoId: number,
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.almacenService.paginateContable(insumoId, options);
  }
}
