import { DeleteResult } from 'typeorm';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
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
import { CreateInsumoDTO } from './DTO/create-insumo.dto';
import { UpdateInsumoDTO } from './DTO/update-insumo.dto';
import { InsumoService } from './insumo.service';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('insumo')
@ApiTags('Insumo')
export class InsumoController {
  constructor(private readonly insumoService: InsumoService) {}

  /**
   * crea una entidad insumo
   * @param insumo @type {CreateInsumoDTO} objeto insumo a crear
   * @returns {InsumoEntity}
   */
  @Post()
  createInsumo(@Body() insumo: CreateInsumoDTO): Promise<InsumoEntity> {
    return this.insumoService.create(insumo);
  }

  /**
   * Retorna un insumo por id
   * @param insumoId id del insumo
   * @returns {InsumoEntity}
   */
  @Get(':id')
  GetInsumoById(@Param('id', ParseIntPipe) id: number): Promise<InsumoEntity> {
    return this.insumoService.getByid(id);
  }

  /**
   * Actualiza objeto insumo por id
   * @param id id del insumo
   * @param insumo objeto insumo para actualizar
   * @returns {UpdateResult}
   */
  @Put(':id')
  updateInsumo(
    @Param('id', ParseIntPipe) id: number,
    @Body() insumo: UpdateInsumoDTO,
  ): Promise<InsumoEntity> {
    return this.insumoService.update(id, insumo);
  }

  /**
   * Borra insumo por id
   * @param id id del insumo
   * @returns {DeleteResult}
   */
  @Delete(':id')
  deleteInsumo(@Param('id') id: number): Promise<DeleteResult> {
    return this.insumoService.delete(id);
  }

  /**
   * Paginate de objetos insumo
   *
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult}
   */
  @Post('paginate')
  paginate(
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.insumoService.paginate(options);
  }
}
