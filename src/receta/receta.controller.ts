import { RecetaEntity } from './entityes/receta.entity';
import { RecetaService } from './receta.service';
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
import { ApiTags } from '@nestjs/swagger';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { DeleteResult } from 'typeorm';
import { CreateRecetaDTO } from './DTO/create-receta.dto';
import { UpdateRecetaDTO } from './DTO/update-receta.dto';

@Controller('receta')
@ApiTags('recetas')
export class RecetaController {
  constructor(private readonly recetaService: RecetaService) {}

  @Post()
  createReceta(@Body() receta: CreateRecetaDTO): Promise<RecetaEntity> {
    return this.recetaService.create(receta);
  }

  @Get(':id')
  GetRecetaById(@Param('id', ParseIntPipe) id: number): Promise<RecetaEntity> {
    return this.recetaService.getById(id);
  }

  @Put(':id')
  updateReceta(
    @Param('id', ParseIntPipe) id: number,
    @Body() receta: UpdateRecetaDTO,
  ): Promise<RecetaEntity> {
    return this.recetaService.update(id, receta);
  }

  @Delete(':id')
  deleteReceta(@Param('id') id: number): Promise<DeleteResult> {
    return this.recetaService.delete(id);
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
    return this.recetaService.paginate(options);
  }
}
