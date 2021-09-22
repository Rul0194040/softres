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

  @Post()
  createMenu(@Body() menu: CreateMenuDTO): Promise<MenuEntity> {
    return this.menuService.create(menu);
  }

  @Get(':id')
  GetMenuById(@Param('id', ParseIntPipe) id: number): Promise<MenuEntity> {
    return this.menuService.getByid(id);
  }

  @Put(':id')
  updateMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() menu: UpdateMenuDTO,
  ): Promise<UpdateResult> {
    return this.menuService.update(id, menu);
  }

  @Put(':menuId/:sectionId')
  updateSection(
    @Param('menuId', ParseIntPipe) menuId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Body() recetas: number[],
  ): Promise<UpdateResult> {
    return this.menuService.updateSection(menuId, sectionId, recetas);
  }

  @Delete(':id')
  deleteMenu(@Param('id') id: number): Promise<DeleteResult> {
    return this.menuService.delete(id);
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
    return this.menuService.paginate(options);
  }
}
