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
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateMenuDTO } from './DTOs/create-menu.dto';
import { UpdateMenuDTO } from './DTOs/update-menu.dto';
import { MenuEntity } from './entitys/menu.entity';
import { MenuService } from './menu.service';

@Controller('menu')
@ApiTags('Menú')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   * crea un menu
   * @param menu @type {CreateMenuDTO} objeto menu que manda el front
   * @returns {MenuEntity} entidad menu
   */
  @Post()
  createMenu(@Body() menu: CreateMenuDTO): Promise<MenuEntity> {
    return this.menuService.create(menu);
  }

  /**
   *
   * @param id id del menuu
   * @returns {MenuEntity}
   */
  @Get(':id')
  GetMenuById(@Param('id', ParseIntPipe) id: number): Promise<MenuEntity> {
    return this.menuService.getByid(id);
  }

  /**
   * edita un menu por id
   * @param id id del menu
   * @param menu objeto menu con el que se edita
   * @returns {UpdateResult}
   */
  @Put(':id')
  updateMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() menu: UpdateMenuDTO,
  ): Promise<UpdateResult> {
    return this.menuService.update(id, menu);
  }

  /**
   * funcion que actualiza las recetas en la seccion de algun menu
   * @param menuId id del menu
   * @param sectionId id de la seccion
   * @param recetas array de id's de recetas
   * @returns {UpdateResult}
   */
  @Put(':menuId/:sectionId')
  updateSection(
    @Param('menuId', ParseIntPipe) menuId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Body() recetas: number[],
  ): Promise<UpdateResult> {
    return this.menuService.updateSection(menuId, sectionId, recetas);
  }

  /**
   * Borra un menu por id
   * @param menuId id del menu
   * @returns {DeleteResult}
   */
  @Delete(':id')
  deleteMenu(@Param('id') id: number): Promise<DeleteResult> {
    return this.menuService.delete(id);
  }

  /**
   * Paginate de menus
   *
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult}
   */
  @Post('paginate')
  paginate(
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.menuService.paginate(options);
  }
}
