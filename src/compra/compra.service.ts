import { SolicitudDetalleEntity } from './entities/solicitudDetalle.entity';
import { SolicitudEntity } from './entities/solicitud.entity';
import { CreateSolicitudDTO } from './dto/create-solicitud.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { getRepository, UpdateResult } from 'typeorm';
import { CreateCompraDTO } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { CompraEntity } from './entities/compra.entity';
import * as moment from 'moment';
import { InformeSolicitud } from './dto/solicitud-informe.dto';
import { CompraDetalleEntity } from './entities/compraDetalles.entity';
import { CotizacionEntity } from '@softres/cotizacion/entitys/cotizacion.entity';
import { CotizacionDetalleEntity } from '@softres/cotizacion/entitys/cotizacionDetalle.entity';
import { InformeCompra } from './dto/informe-compra.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { forIn } from 'lodash';

@Injectable()
export class CompraService {
  /**
 * 
..######...#######..##.....##.########..########.....###.....######.
.##....##.##.....##.###...###.##.....##.##.....##...##.##...##....##
.##.......##.....##.####.####.##.....##.##.....##..##...##..##......
.##.......##.....##.##.###.##.########..########..##.....##..######.
.##.......##.....##.##.....##.##........##...##...#########.......##
.##....##.##.....##.##.....##.##........##....##..##.....##.##....##
..######...#######..##.....##.##........##.....##.##.....##..######.
 */

  async create(compra: CreateCompraDTO): Promise<InformeCompra> {
    const cotizacion = await getRepository(CotizacionEntity).findOne(
      compra.cotizacionId,
    );

    const compraToCreate: CompraEntity = {
      fecha: compra.fecha ? compra.fecha : moment().toDate(),
      folio: compra.folio,
      status: compra.status,
      cotizacionId: compra.cotizacionId,
    };

    const createdCompra = await getRepository(CompraEntity).save(
      compraToCreate,
    );
    const insumosCotizados = await getRepository(CotizacionDetalleEntity)
      .createQueryBuilder('cotz')
      .leftJoin('cotz.insumo', 'insumo')
      .select([
        'cotz.id',
        'cotz.solicitudId',
        'cotz.cantidad',
        'insumo.id',
        'insumo.nombre',
      ])
      .where('cotz.solicitudId=:id', { id: cotizacion.id })
      .getMany();

    const detalles: CompraDetalleEntity[] = [];

    for (let idx = 0; idx < insumosCotizados.length; idx++) {
      const registro = compra.detalles[idx];

      const compraDetalle: CompraDetalleEntity = {
        cantidad: registro.cantidad,
        insumoId: registro.insumoId,
        proveedor: registro.proveedor,
        proveedorId: registro.proveedorId,
        compraId: registro.compraId,
        total: registro.total,
      };

      detalles[idx] = await getRepository(CompraDetalleEntity).save(
        compraDetalle,
      );
    }

    const result: InformeCompra = {
      compra: createdCompra,
      detalles,
    };

    return result;
  }

  findAll(): Promise<CompraEntity[]> {
    return getRepository(CompraEntity).find();
  }

  findOne(id: number): Promise<CompraEntity> {
    return getRepository(CompraEntity).findOne(id);
  }

  update(id: number, updateCompraDto: UpdateCompraDto): Promise<UpdateResult> {
    return getRepository(CompraEntity).update(id, updateCompraDto);
  }

  /**
..######...#######..##.......####..######..####.########.##.....##.########..########..######.
.##....##.##.....##.##........##..##....##..##.....##....##.....##.##.....##.##.......##....##
.##.......##.....##.##........##..##........##.....##....##.....##.##.....##.##.......##......
..######..##.....##.##........##..##........##.....##....##.....##.##.....##.######....######.
.......##.##.....##.##........##..##........##.....##....##.....##.##.....##.##.............##
.##....##.##.....##.##........##..##....##..##.....##....##.....##.##.....##.##.......##....##
..######...#######..########.####..######..####....##.....#######..########..########..######.
   */

  async createSolicitud(
    solicitud: CreateSolicitudDTO,
  ): Promise<InformeSolicitud> {
    const ins = await getRepository(InsumoEntity).findByIds(solicitud.insumos);

    if (!ins) {
      throw new HttpException(
        'no hay insumos que agregar',
        HttpStatus.NOT_FOUND,
      );
    }

    const solicitudToCreate: SolicitudEntity = {
      usuarioId: solicitud.usuarioId,
      fecha: solicitud.fecha ? new Date(solicitud.fecha) : moment().toDate(),
      folio: `${moment().format('DDMMYYYY')}${solicitud.depto.substr(0, 2)}`,
      depto: solicitud.depto,
    };

    const createdSolicitud = await getRepository(SolicitudEntity).save(
      solicitudToCreate,
    );

    const detalles: SolicitudDetalleEntity[] = [];

    for (let idx = 0; idx < solicitud.detalles.length; idx++) {
      const registro = solicitud.detalles[idx];

      const solicitudDetalle: SolicitudDetalleEntity = {
        cantidad: registro.cantidad,
        insumoId: registro.insumoId,
        solicitudId: createdSolicitud.id,
      };

      detalles[idx] = await getRepository(SolicitudDetalleEntity).save(
        solicitudDetalle,
      );
    }

    const result: InformeSolicitud = {
      solicitud: createdSolicitud,
      detalles,
    };

    return result;
  }

  async getSolicitudById(id: number): Promise<SolicitudEntity> {
    return await getRepository(SolicitudEntity).findOne(id, {
      relations: ['detalle'],
    });
  }

  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    const dataQuery =
      getRepository(SolicitudEntity).createQueryBuilder('solicitud');

    forIn(options.filters, (value, key) => {
      if (key === 'folio') {
        dataQuery.andWhere('( solicitud.folio LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'solicitud.fecha';
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
