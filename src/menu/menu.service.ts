import { UpdateMenuDTO } from './DTOs/update-menu.dto';
import { RecetaEntity } from './../receta/entities/receta.entity';
import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { SeccionEntity } from './entitys/section.entity';
import { MenuEntity } from './entitys/menu.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDTO } from './DTOs/create-menu.dto';
import { plainToClass } from 'class-transformer';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { forIn } from 'lodash';

@Injectable()
export class MenuService {
  /**
   * crea el menu y sus secciones correspondientes
   * @param menu @type {CreateMenuDTO} objeto menu a crear
   * @returns {MenuEntity}
   */
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

  /**
   * actualiza recetas en la seccion de un menu especifico
   * @param menuId id del menu
   * @param sectionId id de la seccion
   * @param newRecetas array de id's de recetas
   * @returns {UpdateResult}
   */
  async updateSection(
    menuId: number,
    sectionId: number,
    newRecetas: number[],
  ): Promise<UpdateResult> {
    const section = await getRepository(SeccionEntity).findOne({
      where: { id: sectionId, menuId },
    });
    const repetido = section.recetas.every((value) => {
      newRecetas.every((itm) => value.id == itm);
    });
    const recetas = await getRepository(RecetaEntity).findByIds(newRecetas);

    if (!section) {
      throw new HttpException('menú ó sección no existe', HttpStatus.NOT_FOUND);
    }

    if (repetido) {
      throw new HttpException(
        'la receta ya existe en la seccion',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await getRepository(SeccionEntity).update(sectionId, {
      recetas: section.recetas.concat(recetas),
    });
  }

  /**
   * retorna una menu por id
   * @param menuId id del menu
   * @returns {MenuEntity}
   */
  async getByid(menuId: number): Promise<MenuEntity> {
    return await getRepository(MenuEntity).findOne(menuId);
  }

  /**
   * Edita un menu por id
   * @param menuId id del meni
   * @param menu objeto menu para editar
   * @returns {UPdateResult}
   */
  async update(menuId: number, menu: UpdateMenuDTO): Promise<UpdateResult> {
    return await getRepository(MenuEntity).update(menuId, {
      nombre: menu.nombre,
    });
  }

  /**
   * Borra un menu por id
   * @param menuId id del menu
   * @returns {DeleteResult}
   */
  async delete(menuId: number): Promise<DeleteResult> {
    return await getRepository(MenuEntity).delete(menuId);
  }

  /**
   *  paginate de menus
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult} array de menus
   */
  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(MenuEntity)
      .createQueryBuilder('menu')
      .leftJoin('menu.secciones', 'secciones')
      .leftJoin('secciones.recetas', 'recetas')
      .select([
        'menu.id',
        'menu.createdAt',
        'menu.nombre',
        'secciones.id',
        'secciones.nombre',
        'recetas.id',
        'recetas.nombre',
        'recetas.depto',
      ]);

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
