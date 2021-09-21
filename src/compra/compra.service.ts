import { CompraDetalleEntity } from './entities/compraDetalles.entity';
import { CompraEntity } from './entities/compra.entity';
import { CotizacionDetalleEntity } from '@softres/cotizacion/entitys/cotizacionDetalle.entity';
import { CotizacionEntity } from '@softres/cotizacion/entitys/cotizacion.entity';
import { CreateCompraDTO } from './dto/create-compra.dto';
import { CreateSolicitudDTO } from './dto/create-solicitud.dto';
import { forIn } from 'lodash';
import { getRepository, UpdateResult } from 'typeorm';
import { InformeCompra } from './dto/informe-compra.dto';
import { InformeSolicitud } from './dto/solicitud-informe.dto';
import { Injectable } from '@nestjs/common';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { SolicitudDetalleEntity } from './entities/solicitudDetalle.entity';
import { SolicitudEntity } from './entities/solicitud.entity';
import { UpdateCompraDto } from './dto/update-compra.dto';
import * as moment from 'moment';

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

    for (let idx = 0; idx < solicitud.detalle.length; idx++) {
      const registro = solicitud.detalle[idx];

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
    return getRepository(SolicitudEntity)
      .createQueryBuilder('solicitud')
      .leftJoin('solicitud.detalle', 'detalle')
      .leftJoin('solicitud.usuario', 'usuario')
      .leftJoin('detalle.insumo', 'insumo')
      .where('solicitud.id = :id', { id })
      .select([
        'solicitud',
        'detalle',
        'usuario.id',
        'usuario.firstName',
        'usuario.lastName',
        'insumo.id',
        'insumo.nombre',
        'insumo.medida',
      ])
      .getOne();
  }

  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(SolicitudEntity)
      .createQueryBuilder('solicitud')
      .leftJoin('solicitud.usuario', 'usuario')
      .select([
        'solicitud',
        'usuario.id',
        'usuario.firstName',
        'usuario.lastName',
      ]);

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
