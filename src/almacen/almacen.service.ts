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
import { AlmacenDetalleEntity } from './entitys/almacenDetalle.entity';

const toFloat = (num): number => parseFloat(num + '');

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
      const createdDetalle: AlmacenDetalleEntity[] = [];
      for (let idx = 0; idx < almacen.detalles.length; idx++) {
        const detalle: CreateDetalleDTO = {
          almacenId: createdAlmacen.id,
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
        createdDetalle[idx] = await getRepository(AlmacenDetalleEntity).save(
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
  ): Promise<AlmacenDetalleEntity[]> {
    const createdDetalle: AlmacenDetalleEntity[] = [];
    const almacenParent = await getRepository(AlmacenEntity).findOne(almacenId);
    let firstDetalleId = 0;

    for (let idx = 0; idx < almacenDetalle.length; idx++) {
      let entradas = 0.0,
        salidas = 0.0;
      let referencia = almacenDetalle[idx].referencia
        ? almacenDetalle[idx].referencia
        : '';

      if (
        almacenDetalle[idx].entradas !== null &&
        almacenDetalle[idx].entradas !== undefined &&
        almacenDetalle[idx].entradas !== 0
      ) {
        entradas = almacenDetalle[idx].entradas;
        referencia =
          referencia === '' ? `E-${moment().format('DDMMYYYY')}` : referencia;
      } else {
        salidas = almacenDetalle[idx].salidas;
        referencia =
          referencia === '' ? `S-${moment().format('DDMMYYYY')}` : referencia;
      }

      const detalle: CreateDetalleDTO = {
        almacenId: almacenParent.id,
        referencia,
        precioUnitario: almacenDetalle[idx].precioUnitario,
        entradas,
        salidas,
        saldo: almacenDetalle[idx].saldo ? almacenDetalle[idx].saldo : 0,
      };
      createdDetalle[idx] = await getRepository(AlmacenDetalleEntity).save(
        detalle,
      );

      if (firstDetalleId === 0) firstDetalleId = createdDetalle[idx].id;
    }

    this.updatePrecios(firstDetalleId);

    return createdDetalle;
  }

  async getByid(almacenId: number): Promise<AlmacenEntity> {
    return await getRepository(AlmacenEntity)
      .createQueryBuilder('almacen')
      .leftJoinAndSelect('almacen.insumo', 'insumo')
      .where('almacen.id = :term', { term: almacenId })
      .getOne();
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
      .leftJoin('insumo.categoria', 'categoria')
      .select([
        'almacen.createdAt',
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
        'categoria.id',
        'categoria.nombre',
      ]);

    forIn(options.filters, (value, key) => {
      if (key === 'nombre') {
        dataQuery.andWhere('( categoria.nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }

      if (key === 'depto') {
        dataQuery.andWhere('( depto = :term )', {
          term: value,
        });
      }

      if (key === 'type') {
        dataQuery.andWhere('( type = :term )', {
          term: value,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'almacen.createdAt';
    }

    const count = await dataQuery.getCount();

    const data = await dataQuery
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.sort, options.direction)
      .getMany();
    console.log(data);
    return {
      data: data,
      skip: options.skip,
      totalItems: count,
    };
  }

  async paginateContable(
    insumoId: number,
    options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(AlmacenDetalleEntity)
      .createQueryBuilder('almacenDet')
      .leftJoin('almacenDet.almacen', 'almacen')
      .leftJoin('almacen.insumo', 'insumo')
      .select([
        'almacenDet.id',
        'almacenDet.createdAt',
        'almacenDet.referencia',
        'almacenDet.entradas',
        'almacenDet.salidas',
        'almacenDet.precioUnitario',
        'almacenDet.precioMedio',
        'almacenDet.cargo',
        'almacenDet.abono',
        'almacenDet.saldo',
        'almacen.id',
        'insumo.id',
        'insumo.nombre',
        'insumo.medida',
        'insumo.unidad',
        'insumo.precioUnitario',
        'insumo.marca',
      ]);

    forIn(options.filters, (value, key) => {
      if (key === 'nombre') {
        dataQuery.andWhere('( insumo.nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'almacenDet.createdAt';
    }

    const count = await dataQuery.getCount();

    const data = await dataQuery
      .where('insumo.id =:id', { id: insumoId })
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

  async updatePrecios(detalleId: number): Promise<UpdateResult> {
    const mainDetalle: AlmacenDetalleEntity = await getRepository(
      AlmacenDetalleEntity,
    ).findOne({ id: detalleId });
    const detalleArray: AlmacenDetalleEntity[] = await getRepository(
      AlmacenDetalleEntity,
    )
      .createQueryBuilder('detalle')
      .where('detalle.almacenId = :term', { term: mainDetalle.almacenId })
      .getMany();

    let preSaldo = toFloat(0.0);
    let stock = toFloat(0.0);
    let costoVenta = toFloat(0.0);

    detalleArray.forEach(async (detalle) => {
      if (detalle.createdAt >= mainDetalle.createdAt) {
        if (toFloat(detalle.entradas) !== 0) {
          detalle.cargo =
            toFloat(detalle.entradas) * toFloat(detalle.precioUnitario);
        } else {
          detalle.abono =
            toFloat(detalle.salidas) * toFloat(detalle.precioUnitario);
        }
        detalle.saldo =
          toFloat(preSaldo) + toFloat(detalle.cargo) - toFloat(detalle.abono);
        detalle.precioMedio = preSaldo / (stock || 1 * 1.0);

        stock += toFloat(detalle.entradas) - toFloat(detalle.salidas);
        costoVenta += toFloat(detalle.abono);
        preSaldo = toFloat(detalle.saldo);
        await getRepository(AlmacenDetalleEntity).update(detalle.id, detalle);
      }
      stock += toFloat(detalle.entradas) - toFloat(detalle.salidas);
      costoVenta += toFloat(detalle.precioMedio);
      preSaldo = toFloat(detalle.saldo);
    });

    return await getRepository(AlmacenEntity).update(mainDetalle.almacenId, {
      costoVenta: costoVenta,
    });
  }
}
