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

const parseKilo = (gr: number): number => gr / 1000.0;

@Injectable()
export class InsumoService {
  /**
   * crea una entidad insumo
   * @param insumo @type {CreateInsumoDTO}
   * @returns {InsumoEntity}
   */
  async create(insumo: CreateInsumoDTO): Promise<InsumoEntity> {
    const insumoToCreate = plainToClass(InsumoEntity, insumo);
    insumoToCreate.merma = insumo.pesoNeto * (insumo.mermaPorcentaje / 100.0);
    insumoToCreate.pesoDrenado = insumo.pesoNeto - insumoToCreate.merma;
    insumoToCreate.precioKilo =
      (insumo.precioUnitario * 1000) / insumoToCreate.pesoDrenado;

    insumoToCreate.categoria = await getRepository(CategoriaEntity).findOne(
      insumo.categoriaId,
    );
    if (insumo.subCategoriaId && insumo.subCategoriaId !== 0) {
      insumoToCreate.subCategoria = await getRepository(
        CategoriaEntity,
      ).findOne(insumo.subCategoriaId);
    }

    return await getRepository(InsumoEntity).save(insumoToCreate);
  }

  /**
   * Retorna un insumo por id
   * @param insumoId id del insumo
   * @returns {InsumoEntity}
   */
  async getByid(insumoId: number): Promise<InsumoEntity> {
    return await getRepository(InsumoEntity)
      .createQueryBuilder('insumo')
      .where('insumo.id=:id', { id: insumoId })
      .getOne();
  }

  /**
   * Actualiza objeto insumo por id
   * @param id id del insumo
   * @param insumo objeto insumo para actualizar
   * @returns {UpdateResult}
   */
  async update(
    insumoId: number,
    insumo: UpdateInsumoDTO,
  ): Promise<InsumoEntity> {
    insumo.pesoNeto = parseKilo(insumo.pesoNeto);
    insumo.merma = insumo.pesoNeto * (insumo.mermaPorcentaje / 100.0);
    insumo.pesoDrenado = insumo.pesoNeto - insumo.merma;
    insumo.precioKilo = (insumo.precioUnitario * 1000) / insumo.pesoDrenado;

    await getRepository(InsumoEntity).update(insumoId, insumo);

    return await getRepository(InsumoEntity)
      .createQueryBuilder('insumo')
      .leftJoin('insumo.categoria', 'categoria')
      .select(['insumo', 'categoria.id', 'categoria.nombre'])
      .where('insumo.id=:id', { id: insumoId })
      .getOne();
  }

  /**
   * Borra insumo por id
   * @param id id del insumo
   * @returns {DeleteResult}
   */
  async delete(insumoId: number): Promise<DeleteResult> {
    return await getRepository(InsumoEntity).delete(insumoId);
  }

  /**
   * Paginate de insumos
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult} array de insumos
   */
  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(InsumoEntity)
      .createQueryBuilder('insumo')
      .leftJoin('insumo.categoria', 'categoria')
      .leftJoin('insumo.subCategoria', 'subcategoria')
      .leftJoin('insumo.proveedor', 'proveedor')
      .select([
        'insumo',
        'categoria.id',
        'categoria.nombre',
        'subcategoria.id',
        'subcategoria.nombre',
        'proveedor.id',
        'proveedor.nombre',
      ]);

    forIn(options.filters, (value, key) => {
      if (key === 'buscar') {
        dataQuery.andWhere('( insumo.nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }

      if (key === 'categoria' && value !== null) {
        dataQuery.andWhere('( insumo.categoriaId = :term2 )', {
          term2: value,
        });
      }

      if (key === 'subcategoria' && value !== null) {
        dataQuery.andWhere('( insumo.subCategoriaId = :term3 )', {
          term3: value,
        });
      }
    });
    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'insumo.nombre';
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
}
