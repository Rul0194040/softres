import { UpdateCatDTO } from './../categoria/DTOs/update-categoria.dto';
import { UpdateInsumoDTO } from './DTO/update-insumo.dto';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { CreateInsumoDTO } from './DTO/create-insumo.dto';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { getRepository, UpdateResult, DeleteResult } from 'typeorm';
import { forIn } from 'lodash';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { CategoriaEntity } from '@softres/categoria/categoria.entity';

@Injectable()
export class InsumoService {
  async create(insumo: CreateInsumoDTO): Promise<InsumoEntity> {
    const categorias = await getRepository(CategoriaEntity)
      .createQueryBuilder('categorias')
      .whereInIds(insumo.categorias)
      .getMany();

    const insumoToCreate = plainToClass(InsumoEntity, insumo);
    insumoToCreate.categorias = categorias;

    const created = await getRepository(InsumoEntity).save(insumoToCreate);
    return created;
  }

  async getByid(insumoId: number): Promise<InsumoEntity> {
    return await getRepository(InsumoEntity).findOne(insumoId);
  }

  async update(
    insumoId: number,
    insumo: UpdateInsumoDTO,
  ): Promise<UpdateResult> {
    const searchInsumo = await getRepository(InsumoEntity).findOne(insumoId);

    const categoriasAnteriores = await getRepository(InsumoEntity)
      .createQueryBuilder()
      .relation(InsumoEntity, 'categorias')
      .of(searchInsumo)
      .loadMany();

    //hay categorias en el array?
    if (insumo.categorias.length) {
      //vamos por las categorias nuevas que vienen en el array.
      const categoriasNuevos = await getRepository(CategoriaEntity)
        .createQueryBuilder()
        .where('id IN (:...ids)', {
          ids: insumo.categorias,
        })
        .getMany();
      //editar las relaciones, quitar las anteriores y poner las nuevas
      await getRepository(InsumoEntity)
        .createQueryBuilder()
        .relation(InsumoEntity, 'categorias')
        .of(searchInsumo)
        .addAndRemove(categoriasNuevos, categoriasAnteriores);

      return await getRepository(InsumoEntity).update(searchInsumo.id, {
        nombre: insumo.nombre,
        unidad: insumo.unidad,
        marca: insumo.marca,
      });
    } else {
      //remover las relaciones de categorias
      await getRepository(InsumoEntity)
        .createQueryBuilder()
        .relation(InsumoEntity, 'categorias')
        .of(searchInsumo)
        .remove(categoriasAnteriores);

      return await getRepository(InsumoEntity).update(searchInsumo.id, {
        nombre: insumo.nombre,
        unidad: insumo.unidad,
        marca: insumo.marca,
      });
    }
  }

  async delete(insumoId: number): Promise<DeleteResult> {
    return await getRepository(InsumoEntity).delete(insumoId);
  }

  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(InsumoEntity).createQueryBuilder();

    forIn(options.filters, (value, key) => {
      if (key === 'nombre') {
        dataQuery.andWhere('( nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'createdAt';
    }

    const count = await dataQuery.getCount();

    const data = await dataQuery
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.sort, 'DESC')
      .getMany();

    return {
      data: data,
      skip: options.skip,
      totalItems: count,
    };
  }
}
