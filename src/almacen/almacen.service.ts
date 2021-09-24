import { Deptos } from './enums/deptos.enum';
import { ProfileTypes } from './../user/profileTypes.enum';
import { LoginIdentityDTO } from './../auth/DTOs/loginIdentity.dto';
import { CreateDetalleDTO } from './DTOs/createDetalleDTO.dto';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { CreateAlmacenDTO } from './DTOs/createAlmacenDTO.dto';
import { AlmacenEntity } from './entitys/almacen.entity';
import { Injectable } from '@nestjs/common';
import { UpdateAlmacenDTO } from './DTOs/updateAlmacenDTO.dto';
import {
  DeleteResult,
  getRepository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { forIn } from 'lodash';
import { AlmacenInformeDTO } from './DTOs/almacenInforneDTO.dto';
import { AlmacenDetalleEntity } from './entitys/almacenDetalle.entity';
import * as moment from 'moment';
import * as Excel from 'exceljs';

const toFloat = (num: string | number): number => parseFloat(num + '');

@Injectable()
export class AlmacenService {
  async create(
    almacen: CreateAlmacenDTO,
  ): Promise<AlmacenInformeDTO | AlmacenEntity> {
    const insumo = await getRepository(InsumoEntity).findOne(almacen.insumoId);

    const almacenToCreate: CreateAlmacenDTO = {
      cantidad: almacen.cantidad,
      depto: almacen.depto,
      insumo,
      insumoId: almacen.insumoId,
      maximo: almacen.maximo,
      minimo: almacen.minimo,
      total: 0,
      type: almacen.type,
    };
    const createdAlmacen = await getRepository(AlmacenEntity).save(
      almacenToCreate,
    );

    if (almacen.detalles && almacen.detalles.length !== 0) {
      const createdDetalle: AlmacenDetalleEntity[] = await this.createDetalle(
        createdAlmacen.id,
        almacen.detalles,
      );
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
    const almacenParent = await getRepository(AlmacenEntity).findOne(almacenId);
    let firstDetalleId = 0;

    for (let i = 0; i < almacenDetalle.length; i++) {
      const detalle = almacenDetalle[i];
      let entradas = 0,
        salidas = 0,
        cargo = 0,
        abono = 0,
        referencia: string;

      const fecha: Date = detalle.fecha ? detalle.fecha : moment().toDate();

      if (
        detalle.entradas !== null &&
        detalle.entradas !== undefined &&
        detalle.entradas !== 0
      ) {
        referencia = `E-${moment(fecha).format('DDMMYYYY')}`;
        entradas = detalle.entradas;
        cargo = detalle.cargo
          ? detalle.cargo
          : detalle.precioUnitario * entradas;
      } else {
        referencia = `S-${moment(fecha).format('DDMMYYYY')}`;
        salidas = detalle.salidas;
        abono = detalle.abono
          ? detalle.abono
          : detalle.precioUnitario * salidas;
      }

      const detalleToCreate: CreateDetalleDTO = {
        almacenId: almacenParent.id,
        fecha,
        referencia,
        entradas,
        salidas,
        precioUnitario: detalle.precioUnitario,
        cargo,
        abono,
        saldo: detalle.saldo + entradas,
      };
      const createdDetalle = await getRepository(AlmacenDetalleEntity).save(
        detalleToCreate,
      );

      if (firstDetalleId === 0) firstDetalleId = createdDetalle.id;
    }
    this.updateTablaContable(firstDetalleId);
    return getRepository(AlmacenDetalleEntity).find({
      where: { almacenId },
    });
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
        'almacen.depto',
        'almacen.type',
        'almacen.total',
        'insumo.id',
        'insumo.nombre',
        'insumo.medida',
        'insumo.unidad',
        'insumo.precioUnitario',
        'insumo.precioKilo',
        'insumo.pesoNeto',
        'insumo.marca',
        'categoria.id',
        'categoria.nombre',
      ]);

    forIn(options.filters, (value, key) => {
      if (key === 'buscar') {
        dataQuery.andWhere('( insumo.nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }

      if (key === 'categoria') {
        dataQuery.andWhere('( insumo.categoriaId = :term2 )', {
          term2: value,
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
        'almacenDet.existencias',
        'almacenDet.fecha',
        'almacen.id',
        'insumo.id',
        'insumo.nombre',
        'insumo.medida',
        'insumo.unidad',
        'insumo.precioUnitario',
        'insumo.marca',
      ])
      .where('insumo.id =:id', { id: insumoId });

    forIn(options.filters, (value, key) => {
      if (key === 'nombre') {
        dataQuery.andWhere('( insumo.nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
      if (key === 'fecha') {
        dataQuery.andWhere('(monthname(almacenDet.fecha) = :mes)', {
          mes: value,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'almacenDet.fecha';
    }

    const data = await dataQuery
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.sort, options.direction)
      .getMany();

    const count = await dataQuery.getCount();

    return {
      data: data,
      skip: options.skip,
      totalItems: count,
    };
  }

  async updateAlmacenDetalle(
    detalleId: number,
    detalle: CreateDetalleDTO,
  ): Promise<any> {
    if (
      detalle.entradas !== null &&
      detalle.entradas !== undefined &&
      detalle.entradas !== 0
    ) {
      detalle.salidas = 0;
      detalle.abono = 0;
      detalle.referencia = `E-${moment(detalle.fecha).format('DDMMYYYY')}`;
    } else {
      detalle.entradas = 0;
      detalle.cargo = 0;
      detalle.referencia = `S-${moment(detalle.fecha).format('DDMMYYYY')}`;
    }
    await getRepository(AlmacenDetalleEntity).update(detalleId, detalle);
    return await this.updateTablaContable(detalleId);
  }

  async updateTablaContable(detalleId: number): Promise<UpdateResult> {
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

    detalleArray.forEach(async (detalle) => {
      if (detalle.createdAt >= mainDetalle.createdAt) {
        detalle.existencias =
          toFloat(stock) + toFloat(detalle.entradas) - toFloat(detalle.salidas);
        detalle.saldo =
          toFloat(preSaldo) + toFloat(detalle.cargo) - toFloat(detalle.abono);
        detalle.precioMedio = preSaldo / (stock || 1 * 1.0);

        stock = detalle.existencias;
        preSaldo = toFloat(detalle.saldo);

        await getRepository(AlmacenDetalleEntity).update(detalle.id, detalle);
      }
      stock += toFloat(detalle.entradas) - toFloat(detalle.salidas);
      preSaldo = toFloat(detalle.saldo);
    });

    return getRepository(AlmacenEntity).update(mainDetalle.almacenId, {
      total: stock,
    });
  }

  async masiveAlmacen(
    almacenId: number,
    file: string,
  ): Promise<CreateDetalleDTO[]> {
    const response: CreateDetalleDTO[] = [];
    const workbook = new Excel.Workbook();
    const data = await workbook.xlsx.readFile(file);
    data.getWorksheet('carga-masiva').eachRow((row, idx) => {
      if (idx === 1) {
        return;
      } else {
        const record: CreateDetalleDTO = {
          almacenId: almacenId,
          fecha: new Date(row.getCell('A').value.toString()) ?? null,
          entradas: row.getCell('B').value ? Number(row.getCell('B').value) : 0,
          salidas: row.getCell('C').value ? Number(row.getCell('C').value) : 0,
          existencias: row.getCell('D').value
            ? Number(row.getCell('D').value)
            : 0,
          precioUnitario: row.getCell('E').value
            ? Number(row.getCell('E').value)
            : 0,
          precioMedio: row.getCell('F').value
            ? Number(row.getCell('F').value)
            : 0,
          cargo: row.getCell('G').value ? Number(row.getCell('G').value) : 0,
          abono: row.getCell('H').value ? Number(row.getCell('H').value) : 0,
          saldo: row.getCell('I').value ? Number(row.getCell('I').value) : 0,
        };
        response.push(record);
      } //Titulos
    });
    return this.createDetalle(almacenId, response);
  }

  async insMinimos(
    options: PaginationOptions,
    user: LoginIdentityDTO,
  ): Promise<PaginationPrimeNgResult> {
    let dataQuery: SelectQueryBuilder<AlmacenEntity>;

    switch (user.profile) {
      case ProfileTypes.COMPRAS || ProfileTypes.ALMACEN_GENERAL:
        dataQuery = getRepository(AlmacenEntity)
          .createQueryBuilder('almacen')
          .leftJoin('almacen.insumo', 'insumo')
          .select([
            'almacen.id',
            'almacen.maximo',
            'almacen.minimo',
            'almacen.total',
            'almacen.depto',
            'insumo.id',
            'insumo.nombre',
          ])
          .where('almacen.total=<almacen.minimo')
          .groupBy('almacen.depto');
        break;

      case ProfileTypes.COCINA:
        dataQuery = getRepository(AlmacenEntity)
          .createQueryBuilder('almacen')
          .leftJoin('almacen.insumo', 'insumo')
          .select([
            'almacen.id',
            'almacen.maximo',
            'almacen.minimo',
            'almacen.total',
            'almacen.depto',
            'insumo.id',
            'insumo.nombre',
          ])
          .where('almacen.total=<almacen.minimo AND almacen.depto=:depto', {
            depto: Deptos.COCINA,
          });
        break;

      case ProfileTypes.BARRA:
        dataQuery = getRepository(AlmacenEntity)
          .createQueryBuilder('almacen')
          .leftJoin('almacen.insumo', 'insumo')
          .select([
            'almacen.id',
            'almacen.maximo',
            'almacen.minimo',
            'almacen.total',
            'insumo.id',
            'insumo.nombre',
          ])
          .where('almacen.total=<almacen.minimo AND almacen.depto=:depto', {
            depto: Deptos.BARRA,
          });
        break;

      default:
        break;
    }

    forIn(options.filters, (value, key) => {
      if (key === 'buscar') {
        dataQuery.andWhere('( insumo.nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
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
