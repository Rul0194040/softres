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
import { almacenDetalleEntity } from './entitys/almacenDetalle.entity';

@Injectable()
export class AlmacenService {
  async create(
    almacen: CreateAlmacenDTO,
  ): Promise<AlmacenInformeDTO | AlmacenEntity> {
    const insumo = await getRepository(InsumoEntity).findOne(almacen.insumoId);
    const total = almacen.capacidad * almacen.cantidad;

    const almacenToCreate: CreateAlmacenDTO = {
      depto: almacen.depto,
      type: almacen.type,
      insumo,
      insumoId: almacen.insumoId,
      cantidad: almacen.cantidad,
      capacidad: almacen.capacidad,
      total,
    };
    const createdAlmacen = await getRepository(AlmacenEntity).save(
      almacenToCreate,
    );

    if (almacen.detalles) {
      const createdDetalle: almacenDetalleEntity[] = [];
      for (let idx = 0; idx < almacen.detalles.length; idx++) {
        const detalle: CreateDetalleDTO = {
          almacenId: createdAlmacen.id,
          fecha: createdAlmacen.createdAt,
          referencia:
            almacen.detalles[idx].entradas != null
              ? `E-${moment(createdAlmacen.createdAt).format('DDMMYYYY')}`
              : `S-${moment(createdAlmacen.createdAt).format('DDMMYYYY')}`,
          precioUnitario: almacen.detalles[idx].precioUnitario,
          entradas: almacen.detalles[idx].entradas
            ? almacen.detalles[idx].entradas
            : 0,
          salidas: almacen.detalles[idx].salidas
            ? almacen.detalles[idx].salidas
            : 0,
          precioMedio: almacen.detalles[idx].precioMedio
            ? almacen.detalles[idx].precioMedio
            : 0,
          cargo: almacen.detalles[idx].cargo ? almacen.detalles[idx].cargo : 0,
          abono: almacen.detalles[idx].abono ? almacen.detalles[idx].abono : 0,
          saldo: almacen.detalles[idx].saldo ? almacen.detalles[idx].saldo : 0,
        };
        createdDetalle[idx] = await getRepository(almacenDetalleEntity).save(
          detalle,
        );
      }
      const result: AlmacenInformeDTO = {
        almacen: createdAlmacen,
        detalle: createdDetalle,
      };

      return result;
    }

    return createdAlmacen;
  }

  async createDetalle(
    almacenId: number,
    almacenDetalle: CreateDetalleDTO[],
  ): Promise<almacenDetalleEntity[]> {
    const createdDetalle: almacenDetalleEntity[] = [];
    const almacenParent = await getRepository(AlmacenEntity).findOne(almacenId);

    for (let idx = 0; idx < almacenDetalle.length; idx++) {
      const detalle: CreateDetalleDTO = {
        almacenId: almacenParent.id,
        fecha: almacenParent.createdAt,
        referencia:
          almacenDetalle[idx].entradas != null
            ? `E-${moment(almacenParent.createdAt).format('DDMMYYYY')}`
            : `S-${moment(almacenParent.createdAt).format('DDMMYYYY')}`,
        precioUnitario: almacenDetalle[idx].precioUnitario,
        entradas: almacenDetalle[idx].entradas
          ? almacenDetalle[idx].entradas
          : 0,
        salidas: almacenDetalle[idx].salidas ? almacenDetalle[idx].salidas : 0,
        precioMedio: almacenDetalle[idx].precioMedio
          ? almacenDetalle[idx].precioMedio
          : 0,
        cargo: almacenDetalle[idx].cargo ? almacenDetalle[idx].cargo : 0,
        abono: almacenDetalle[idx].abono ? almacenDetalle[idx].abono : 0,
        saldo: almacenDetalle[idx].saldo ? almacenDetalle[idx].saldo : 0,
      };
      createdDetalle[idx] = await getRepository(almacenDetalleEntity).save(
        detalle,
      );
    }

    return createdDetalle;
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
    const dataQuery = getRepository(AlmacenEntity)
      .createQueryBuilder('almacen')
      .leftJoin('almacen.insumo', 'insumo')
      .select([
        'almacen.id',
        'almacen.cantidad',
        'almacen.capacidad',
        'almacen.depto',
        'almacen.type',
        'almacen.total',
        'insumo.id',
        'insumo.nombre',
        'insumo.medida',
        'insumo.unidad',
        'insumo.precioUnitario',
        'insumo.marca',
      ]);

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

  async paginateContable(
    options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(almacenDetalleEntity)
      .createQueryBuilder('almacenDet')
      .leftJoin('almacenDet.insumo', 'insumo')
      .select([
        'almacenDet.id',
        'almacenDet.cantidad',
        'almacenDet.capacidad',
        'almacenDet.depto',
        'almacenDet.type',
        'almacenDet.total',
        'insumo.id',
        'insumo.nombre',
        'insumo.medida',
        'insumo.unidad',
        'insumo.precioUnitario',
        'insumo.marca',
      ]);

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
