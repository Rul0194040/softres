import { UpdateMenuDTO } from './DTOs/update-menu.dto';
import { RecetaEntity } from './../receta/entities/receta.entity';
import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { SeccionEntity } from './entitys/section.entity';
import { MenuEntity } from './entitys/menu.entity';
import { Injectable } from '@nestjs/common';
import { CreateMenuDTO } from './DTOs/create-menu.dto';
import { plainToClass } from 'class-transformer';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { forIn } from 'lodash';

@Injectable()
export class MenuService {
  async create(menu: CreateMenuDTO): Promise<MenuEntity> {
    const menuToCreate = plainToClass(MenuEntity, menu);
    const createdMenu = await getRepository(MenuEntity).save(menuToCreate);

    for (let idx = 0; idx < menu.secciones.length; idx++) {
      const seccion = menu.secciones[idx];

      const seccionToCreate: SeccionEntity = {
        nombre: seccion.nombre,
        menuId: menuToCreate.id,
        recetas: await getRepository(RecetaEntity).findByIds(seccion.recetas),
      };

      await getRepository(SeccionEntity).save(seccionToCreate);
    }

    return createdMenu;
  }

  async getByid(menuId: number): Promise<MenuEntity> {
    return await getRepository(MenuEntity).findOne(menuId);
  }

  async update(menuId: number, menu: UpdateMenuDTO): Promise<UpdateResult> {
    return await getRepository(MenuEntity).update(menuId, {
      nombre: menu.nombre,
    });
  }

  async delete(menuId: number): Promise<DeleteResult> {
    return await getRepository(MenuEntity).delete(menuId);
  }

  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(MenuEntity)
      .createQueryBuilder('menu')
      .select(['menu.id', 'menu.createdAt', 'menu.nombre']);

    forIn(options.filters, (value, key) => {
      if (key === 'nombre') {
        dataQuery.andWhere('( menu.nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
    });

    const count = await dataQuery.getCount();

    const data = await dataQuery
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.sort, options.direction)
      .getMany();
    return {
      data: data,
      skip: options.skip,
      totalItems: count,
    };
  }
}
