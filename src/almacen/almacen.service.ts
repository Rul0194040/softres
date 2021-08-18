import { AlmacenDetalle } from './entitys/almacenDetalle.entity';
import { CreateDetalleDTO } from './DTOs/createDetalleDTO.dto';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { CreateAlmacenDTO } from './DTOs/createAlmacenDTO.dto';
import { AlmacenEntity } from './entitys/almacen.entity';
import { Injectable } from '@nestjs/common';
import { UpdateAlmacenDTO } from './DTOs/updateAlmacenDTO.dto';
import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { forIn } from 'lodash';
import * as moment from 'moment';
import { AlmacenInformeDTO } from './DTOs/almacenInforneDTO.dto';

@Injectable()
export class AlmacenService {
  async create(almacen: CreateAlmacenDTO): Promise<AlmacenInformeDTO> {
    const insumo = await getRepository(InsumoEntity).findOne(almacen.insumoId);

    const almacenToCreate: CreateAlmacenDTO = {
      type: almacen.type,
      factor: almacen.factor,
      insumo,
      cantidad: almacen.cantidad,
      capacidad: almacen.capacidad,
    };
    const createdAlmacen = await getRepository(AlmacenEntity).save(
      almacenToCreate,
    );

    const createdDetalle: AlmacenDetalle[] = [];
    for (let idx = 0; idx < almacen.detalles.length; idx++) {
      const detalle: CreateDetalleDTO = {
        depto: almacen.detalles[idx].depto,
        fecha: createdAlmacen.createdAt,
        referencia:
          almacen.detalles[idx].entradas != null
            ? `E-${moment(createdAlmacen.createdAt).format('DDMMYYYY')}`
            : `S-${moment(createdAlmacen.createdAt).format('DDMMYYYY')}`,
        precioUnitario: almacen.detalles[idx].precioUnitario,
      };
      createdDetalle[idx] = await getRepository(AlmacenDetalle).save(detalle);
    }
    const result: AlmacenInformeDTO = {
      almacen: createdAlmacen,
      detalle: createdDetalle,
    };

    return result;
  }

  async getByid(almacenId: number): Promise<AlmacenEntity> {
    return await getRepository(AlmacenEntity).findOne(almacenId);
  }

  async update(
    almacenId: number,
    almacen: UpdateAlmacenDTO,
  ): Promise<UpdateResult> {
    return await getRepository(AlmacenEntity).update(almacenId, almacen);
  }

  async delete(almacenId: number): Promise<DeleteResult> {
    return await getRepository(AlmacenEntity).delete(almacenId);
  }

  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(AlmacenEntity).createQueryBuilder();

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
