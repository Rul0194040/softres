import { UpdateInsumoDTO } from './DTO/update-insumo.dto';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { CreateInsumoDTO } from './DTO/create-insumo.dto';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { getRepository, DeleteResult } from 'typeorm';
import { forIn } from 'lodash';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { CategoriaEntity } from '@softres/categoria/categoria.entity';

@Injectable()
export class InsumoService {
  async create(insumo: CreateInsumoDTO): Promise<InsumoEntity> {
    const insumoToCreate = plainToClass(InsumoEntity, insumo);
    insumoToCreate.categoria = await getRepository(CategoriaEntity).findOne(
      insumo.categoriaId,
    );

    if (insumo.subCategoriaId) {
      insumoToCreate.subCategoria = await getRepository(
        CategoriaEntity,
      ).findOne(insumo.subCategoriaId);
    }

    const created = await getRepository(InsumoEntity).save(insumoToCreate);
    return created;
  }

  async getByid(insumoId: number): Promise<InsumoEntity> {
    return await getRepository(InsumoEntity)
      .createQueryBuilder('insumo')
      .where('insumo.id=:id', { id: insumoId })
      .getOne();
  }

  async update(
    insumoId: number,
    insumo: UpdateInsumoDTO,
  ): Promise<InsumoEntity> {
    await getRepository(InsumoEntity).update(insumoId, insumo);

    return await getRepository(InsumoEntity)
      .createQueryBuilder('insumo')
      .leftJoin('insumo.categoria', 'categoria')
      .select(['insumo', 'categoria.id', 'categoria.nombre'])
      .where('insumo.id=:id', { id: insumoId })
      .getOne();
  }

  async delete(insumoId: number): Promise<DeleteResult> {
    return await getRepository(InsumoEntity).delete(insumoId);
  }

  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(InsumoEntity)
      .createQueryBuilder('insumo')
      .leftJoin('insumo.categoria', 'categoria')
      .select(['insumo', 'categoria.id', 'categoria.nombre']);

    forIn(options.filters, (value, key) => {
      if (key === 'categoria') {
        dataQuery.andWhere('( categoria.id = :term )', {
          term: value,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'insumo.createdAt';
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
