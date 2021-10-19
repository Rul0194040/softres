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

  /**
   * crear una entidad categoria
   * @param categoria @type {CreateCatDTO}
   * @returns {CategoriaEntity}
   */
  @Post()
  createCategoria(@Body() categoria: CreateCatDTO): Promise<CategoriaEntity> {
    return this.categoriaService.create(categoria);
  }

  /**
   * retorna una categoria por id
   * @param id id de la categoria
   * @returns {CategoriaEntity}
   */
  @Get(':id')
  GetCategoriaById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoriaEntity> {
    return this.categoriaService.getByid(id);
  }

  /**
   * actualizar un objeto categoria
   * @param id id de la categoria
   * @param categoria @type {UpdateCatDTO} objeto para editar categoria
   * @returns {UpdateResult}
   */
  @Put(':id')
  updateCategoria(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoria: UpdateCatDTO,
  ): Promise<UpdateResult> {
    return this.categoriaService.update(id, categoria);
  }

  /**
   * Borra una entidad categoria
   * @param id id de la categoria
   * @returns {DeleteResult}
   */
  @Delete(':id')
  deleteCategoria(@Param('id') id: number): Promise<DeleteResult> {
    return this.categoriaService.delete(id);
  }

  /**
   * Paginate de categorias
   *
   * @param options Opciones de paginación
   * @returns {PaginationPrimeNgResult}
   */
  @Post('paginate')
  paginate(
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.categoriaService.paginate(options);
  }

  /**
   * Retorna subcategorias por id de categoria
   * @param id Id de categoría que se quiere buscar sus subcategorías
   * @returns Array con las subcategorías
   */
  @Get('subcategorias/:id')
  getSubcategorias(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoriaEntity[]> {
    return this.categoriaService.getSubcategorias(id);
  }
}
