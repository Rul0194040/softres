import { AlmacenEntity } from './entitys/almacen.entity';
import { ContableDetalleEntity } from './entitys/contableDetalle.entity';
import { ContableEntity } from './entitys/contable.entity';
import { CreateAlmacenDTO } from './DTOs/createAlmacen.dto';
import { CreateContableDetalleDTO } from './DTOs/contableDetalle.dto';
import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { Deptos } from './enums/deptos.enum';
import { forIn } from 'lodash';
import { Injectable } from '@nestjs/common';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { LoginIdentityDTO } from './../auth/DTOs/loginIdentity.dto';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { ProfileTypes } from './../user/profileTypes.enum';
import { SolicitudDetalleEntity } from '@softres/compra/entities/solicitudDetalle.entity';
import { SolicitudEstados } from '@softres/compra/enum/solicitud-estados.enum';
import { UpdateAlmacenDTO } from './DTOs/updateAlmacenDTO.dto';
import * as Excel from 'exceljs';
import * as moment from 'moment';
import { SolicitudEntity } from '@softres/compra/entities/solicitud.entity';
import { MovType } from './enums/movTypes.enum';

const toFloat = (num: string | number): number => parseFloat(num + '');
const parseKilo = (gr: number): number => gr / 1000.0;
const parseGramos = (kg: number): number => kg * 1000.0;

@Injectable()
export class AlmacenService {
  async createAlmacen(almacen: CreateAlmacenDTO): Promise<AlmacenEntity> {
    const insumo = await getRepository(InsumoEntity).findOne(almacen.insumoId);
    const contable = await getRepository(ContableEntity).findOne({
      where: { insumoId: almacen.insumoId },
    });

    const almacenToCreate: CreateAlmacenDTO = {
      cantidad: almacen.cantidad,
      depto: almacen.depto,
      insumoId: almacen.insumoId,
      maximo: parseKilo(almacen.maximo),
      minimo: parseKilo(almacen.minimo),
      total: 0,
      type: almacen.type,
    };

    const createdAlmacen = await getRepository(AlmacenEntity).save(
      almacenToCreate,
    );

    if (!contable) {
      await getRepository(ContableEntity).save({
        insumoId: almacen.insumoId,
      });
    }

    if (almacen.detalleContable) {
      await this.createDetalle(
        createdAlmacen.id,
        almacen.detalleContable,
        MovType.COMPRA,
      );
    }

    if (almacen.cantidad !== 0) {
      await this.createDetalle(
        createdAlmacen.id,
        [
          {
            entradas: almacen.cantidad * insumo.pesoNeto,
            precioUnitario: insumo.precioUnitario,
          },
        ],
        MovType.COMPRA,
      );
    }

    return createdAlmacen;
  }

  async createDetalle(
    almacenId: number,
    detalles: CreateContableDetalleDTO[],
    tipoMov: MovType,
  ): Promise<ContableDetalleEntity[]> {
    const almacen = await getRepository(AlmacenEntity).findOne(almacenId, {
      relations: ['insumo'],
    });
    const contable = await getRepository(ContableEntity).findOne({
      where: { insumoId: almacen.insumoId },
    });
    const createdDetalles = [];
    let firstDetalleIndex = 0;
    let total = toFloat(almacen.total);

    await detalles.reduce(async (memo, detalle) => {
      await memo;

      let entradas = 0.0,
        salidas = 0.0,
        cargo = 0,
        abono = 0;

      const fecha: Date = detalle.fecha ? detalle.fecha : moment().toDate();
      const referencia = detalle.referencia
        ? detalle.referencia
        : `${tipoMov}${almacen.depto.substr(0, 2)}-${moment(fecha).format(
            'DDMMYY',
          )}`;

      if (
        detalle.entradas !== null &&
        detalle.entradas !== undefined &&
        detalle.entradas !== 0.0
      ) {
        entradas = detalle.entradas;
        cargo = detalle.cargo
          ? detalle.cargo
          : detalle.precioUnitario * entradas;

        total += parseKilo(entradas);
      } else {
        salidas = detalle.salidas;
        abono = detalle.abono
          ? detalle.abono
          : detalle.precioUnitario * salidas;

        total -= parseKilo(salidas);
      }

      const detalleContableToCreate: CreateContableDetalleDTO = {
        fecha,
        referencia,
        precioUnitario: detalle.precioUnitario,
        entradas: parseKilo(entradas),
        salidas: parseKilo(salidas),
        cargo,
        abono,
        contableId: contable.id,
      };
      const createdDetalle = await getRepository(ContableDetalleEntity).save(
        detalleContableToCreate,
      );

      createdDetalles.push(createdDetalle);
      if (firstDetalleIndex === 0) firstDetalleIndex = createdDetalle.id;
      return memo;
    }, Promise.resolve(null));

    await getRepository(AlmacenEntity).update(almacen.id, {
      cantidad: Math.ceil(parseGramos(total) / almacen.insumo.pesoNeto),
      total,
    });

    await this.updateTablaContable(firstDetalleIndex);
    return createdDetalles;
  }

  // detalleId es el id del detalle desde donde va a empezar a actualizar la tabla
  async updateTablaContable(detalleId: number): Promise<UpdateResult> {
    const mainDetalle = await getRepository(ContableDetalleEntity).findOne(
      detalleId,
    );

    const contable = await getRepository(ContableEntity).findOne(
      mainDetalle.contableId,
      { relations: ['insumo', 'detalle'] },
    );

    let preSaldo = toFloat(0.0);
    let stock = toFloat(0.0);

    Promise.all(
      contable.detalle.map(async (detalle) => {
        if (detalle.createdAt >= mainDetalle.createdAt) {
          detalle.existencias =
            toFloat(stock) +
            toFloat(detalle.entradas) -
            toFloat(detalle.salidas);
          detalle.saldo =
            toFloat(preSaldo) + toFloat(detalle.cargo) - toFloat(detalle.abono);
          detalle.precioMedio = preSaldo / (stock || 1.0);

          stock = detalle.existencias;
          preSaldo = toFloat(detalle.saldo);

          await getRepository(ContableDetalleEntity).update(
            detalle.id,
            detalle,
          );
        }
        stock += toFloat(detalle.entradas) - toFloat(detalle.salidas);
        preSaldo = toFloat(detalle.saldo);
      }),
    );

    return null;
  }

  async getById(almacenId: number): Promise<AlmacenEntity> {
    return await getRepository(AlmacenEntity).findOne(almacenId, {
      relations: ['insumo'],
    });
  }

  getContableByInsumo(insumoId: number): Promise<ContableEntity> {
    return getRepository(ContableEntity).findOne({
      where: { insumoId },
      relations: ['insumo'],
    });
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
        'almacen.id',
        'almacen.createdAt',
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

      if (key === 'depto') {
        dataQuery.andWhere('( almacen.depto = :term3 )', {
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

  async paginateContable(
    contableId: number,
    options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(ContableDetalleEntity)
      .createQueryBuilder('detalle')
      .select([
        'detalle.id',
        'detalle.fecha',
        'detalle.referencia',
        'detalle.entradas',
        'detalle.salidas',
        'detalle.existencias',
        'detalle.precioUnitario',
        'detalle.precioMedio',
        'detalle.cargo',
        'detalle.abono',
        'detalle.saldo',
        'detalle.contableId',
      ])
      .where('detalle.contableId=:contableId', { contableId });

    forIn(options.filters, (value, key) => {
      if (key === 'nombre') {
        dataQuery.andWhere('( insumo.nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
      if (key === 'fecha') {
        dataQuery.andWhere('(monthname(detalle.fecha) = :mes)', {
          mes: value,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'detalle.createdAt';
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

  async updateDetalleContable(
    detalleId: number,
    detalle: CreateContableDetalleDTO,
  ): Promise<any> {
    if (detalle.salidas) detalle.salidas = parseKilo(detalle.salidas);
    if (detalle.entradas) detalle.entradas = parseKilo(detalle.entradas);
    if (
      detalle.entradas !== null &&
      detalle.entradas !== undefined &&
      detalle.entradas !== 0.0
    ) {
      detalle.salidas = 0.0;
      detalle.abono = 0;
      detalle.referencia = `E-${moment(detalle.fecha).format('DDMMYY')}`;
    } else {
      detalle.entradas = 0.0;
      detalle.cargo = 0;
      detalle.referencia = `S-${moment(detalle.fecha).format('DDMMYY')}`;
    }
    await getRepository(ContableDetalleEntity).update(detalleId, detalle);
    return await this.updateTablaContable(detalleId);
  }

  async masiveAlmacen(
    almacenId: number,
    file: string,
  ): Promise<CreateContableDetalleDTO[]> {
    const response: CreateContableDetalleDTO[] = [];
    const workbook = new Excel.Workbook();
    const data = await workbook.xlsx.readFile(file);
    const almacen = await getRepository(AlmacenEntity).findOne(almacenId);
    data.getWorksheet('carga-masiva').eachRow((row, idx) => {
      if (idx === 1) {
        // Fila de encabezados
        return;
      } else {
        const entradas = row.getCell('B').value
          ? Number(row.getCell('B').value)
          : 0.0;
        const fecha =
          new Date(row.getCell('A').value.toString()) ?? moment().toDate();
        const tipoMov = entradas !== 0 ? MovType.COMPRA : MovType.VENTA;
        const referencia = `${tipoMov}${almacen.depto.substr(0, 2)}-${moment(
          fecha,
        ).format('DDMMYY')}`;

        const record: CreateContableDetalleDTO = {
          fecha,
          referencia,
          entradas,
          salidas: row.getCell('C').value
            ? Number(row.getCell('C').value)
            : 0.0,
          existencias: row.getCell('D').value
            ? Number(row.getCell('D').value)
            : 0.0,
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
      }
    });

    return this.createDetalle(almacenId, response, MovType.COMPRA);
  }

  async insMinimos(
    options: PaginationOptions,
    user: LoginIdentityDTO,
  ): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(AlmacenEntity)
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
        'insumo.medida',
      ]);

    switch (user.profile) {
      case ProfileTypes.COMPRAS || ProfileTypes.ALMACEN_GENERAL:
        dataQuery.where('almacen.total<=almacen.minimo');
        break;

      case ProfileTypes.COCINA:
        dataQuery.where(
          'almacen.total<=almacen.minimo AND almacen.depto=:depto',
          {
            depto: Deptos.COCINA,
          },
        );
        break;

      case ProfileTypes.BARRA:
        dataQuery.where(
          'almacen.total<=almacen.minimo AND almacen.depto=:depto',
          {
            depto: Deptos.BARRA,
          },
        );
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
      data: await this.getAlmacenesByDepto(data),
      skip: options.skip,
      totalItems: count,
    };
  }

  async getAlmacenesByDepto(almacenes: AlmacenEntity[]): Promise<any> {
    const cocina: InsumoEntity[] = [];
    const barra: InsumoEntity[] = [];
    const almacen: InsumoEntity[] = [];
    if (almacenes.length !== 0) {
      const minimosIds = almacenes.map((a) => a.insumo.id);
      const inSolicitados = await getRepository(SolicitudDetalleEntity)
        .createQueryBuilder('detalle')
        .leftJoin('detalle.solicitud', 'solicitud')
        .leftJoin('detalle.insumo', 'insumo')
        .where('solicitud.status IN (:status)', {
          status: [
            SolicitudEstados.BORRADOR,
            SolicitudEstados.GENERADA,
            SolicitudEstados.PARA_COMPRAS,
          ],
        })
        .where('insumo.id IN (:...ids)', { ids: minimosIds })
        .select(['detalle.insumoId'])
        .getMany();
      const solicitadosIds = inSolicitados.map((ins) => ins.insumoId);
      const arrUno = minimosIds.sort((a, b) => a - b);
      const arrDos = solicitadosIds.sort((a, b) => a - b);

      const realMinimos = arrUno.filter((minimo) => {
        if (!arrDos.includes(minimo)) {
          return minimo;
        }
      });

      almacenes.forEach((alm) => {
        if (realMinimos.includes(alm.insumo.id)) {
          switch (alm.depto) {
            case Deptos.COCINA:
              cocina.push(alm.insumo);
              break;
            case Deptos.BARRA:
              barra.push(alm.insumo);

              break;
            case Deptos.ALMACEN:
              almacen.push(alm.insumo);
              break;

            default:
              break;
          }
        }
      });
    }

    return {
      cocina,
      barra,
      almacen,
    };
  }

  async abastecer(
    solicitudId: number,
  ): Promise<UpdateResult | PromiseLike<UpdateResult>> {
    const solicitud = await getRepository(SolicitudEntity).findOne(
      solicitudId,
      { relations: ['detalle'] },
    );
    let cont = 0;
    await Promise.all(
      solicitud.detalle.map(async (detalle) => {
        const almacen = await getRepository(AlmacenEntity).findOne({
          where: { insumoId: detalle.insumoId, depto: Deptos.ALMACEN },
        });
        const almacenDepto = await getRepository(AlmacenEntity).findOne({
          where: { insumoId: detalle.insumoId, depto: solicitud.depto },
        });

        if (
          parseGramos(almacen.total) >= detalle.cantidad &&
          !detalle.abastecido
        ) {
          await this.createDetalle(
            almacen.id,
            [
              {
                salidas: detalle.cantidad,
                precioUnitario: 0,
              },
            ],
            MovType.SALIDA_TRANS,
          );
          await this.createDetalle(
            almacenDepto.id,
            [
              {
                entradas: detalle.cantidad,
                precioUnitario: 0,
              },
            ],
            MovType.ENTRADA_TRANS,
          );
          console.log('Entra para ' + detalle.id);

          await getRepository(SolicitudDetalleEntity).update(detalle.id, {
            abastecido: true,
          });
          cont++;
        } else if (detalle.abastecido) cont++;
      }),
    );

    const status =
      cont === solicitud.detalle.length
        ? SolicitudEstados.COMPLETADA
        : SolicitudEstados.PARA_COMPRAS;

    return getRepository(SolicitudEntity).update(solicitud.id, { status });
  }
}
