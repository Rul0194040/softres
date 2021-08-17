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
    const insumoToCreate = plainToClass(InsumoEntity, insumo);
    insumoToCreate.categoria = await getRepository(CategoriaEntity).findOne(
      insumo.categoriaId,
    );

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
    return await getRepository(InsumoEntity).update(insumoId, insumo);
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
