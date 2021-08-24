import { CategoriaService } from './categoria.service';
import { CategoriaEntity } from '@softres/categoria/categoria.entity';
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
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateCatDTO } from './DTOs/create-categoria.dto';
import { UpdateCatDTO } from './DTOs/update-categoria.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('categoria')
@ApiTags('Categoría')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  createCategoria(@Body() categoria: CreateCatDTO): Promise<CategoriaEntity> {
    return this.categoriaService.create(categoria);
  }

  @Get(':id')
  GetCategoriaById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoriaEntity> {
    return this.categoriaService.getByid(id);
  }

  @Put(':id')
  updateCategoria(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoria: UpdateCatDTO,
  ): Promise<UpdateResult> {
    return this.categoriaService.update(id, categoria);
  }

  @Delete(':id')
  deleteCategoria(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoriaService.delete(id);
  }

  /**
   * Paginate
   *
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult}
   */
  @Post('paginate')
  paginate(
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.categoriaService.paginate(options);
  }
}
