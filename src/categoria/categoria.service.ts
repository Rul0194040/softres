import { CategoriaEntity } from '@softres/categoria/categoria.entity';
import { Injectable } from '@nestjs/common';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { plainToClass } from 'class-transformer';
import { forIn } from 'lodash';
import { getRepository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateCatDTO } from './DTOs/create-categoria.dto';
import { UpdateCatDTO } from './DTOs/update-categoria.dto';

@Injectable()
export class CategoriaService {
  async create(categoria: CreateCatDTO): Promise<CategoriaEntity> {
    const categoriaToCreate = plainToClass(CategoriaEntity, categoria);
    if (categoria.parentCatId) {
      categoriaToCreate.parentCat = await getRepository(
        CategoriaEntity,
      ).findOne(categoria.parentCatId);
    }
    const created = await getRepository(CategoriaEntity).save(
      categoriaToCreate,
    );
    return created;
  }

  async getByid(categoriaId: number): Promise<CategoriaEntity> {
    return await getRepository(CategoriaEntity).findOne(categoriaId);
  }

  async update(
    categoriaId: number,
    categoria: UpdateCatDTO,
  ): Promise<UpdateResult> {
    return await getRepository(CategoriaEntity).update(categoriaId, categoria);
  }

  async delete(categoriaId: number): Promise<DeleteResult> {
    return await getRepository(CategoriaEntity).delete(categoriaId);
  }

  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(CategoriaEntity)
      .createQueryBuilder()
      .where('parentCatId IS NULL');

    forIn(options.filters, (value, key) => {
      if (key === 'nombre') {
        dataQuery.andWhere('( nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'nombre';
    }

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

  async getSubcategorias(idCat: number): Promise<CategoriaEntity[]> {
    return await getRepository(CategoriaEntity)
      .createQueryBuilder('categoria')
      .select(['categoria.id', 'categoria.nombre'])
      .where('categoria.parentCatId = :term', { term: idCat })
      .orderBy('categoria.nombre', 'ASC')
      .getMany();
  }
}
