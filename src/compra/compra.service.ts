import { CotzEstados } from './../cotizacion/cotizacionEstados.enum';
import { CompraDetalleEntity } from './entities/compraDetalles.entity';
import { CompraEntity } from './entities/compra.entity';
import { CotizacionDetalleEntity } from '@softres/cotizacion/entitys/cotizacionDetalle.entity';
import { CotizacionEntity } from '@softres/cotizacion/entitys/cotizacion.entity';
import { CreateCompraDTO } from './dto/create-compra.dto';
import { CreateSolicitudDTO } from './dto/create-solicitud.dto';
import { forIn } from 'lodash';
import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
import { InformeCompra } from './dto/informe-compra.dto';
import { InformeSolicitud } from './dto/solicitud-informe.dto';
import { Injectable } from '@nestjs/common';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { SolicitudDetalleEntity } from './entities/solicitudDetalle.entity';
import { SolicitudEntity } from './entities/solicitud.entity';
import { UpdateCompraDto } from './dto/update-compra.dto';
import * as moment from 'moment';
import { LoginIdentityDTO } from '@softres/auth/DTOs/loginIdentity.dto';
import { ProfileTypes } from '@softres/user/profileTypes.enum';
import { Deptos } from '@softres/almacen/enums/deptos.enum';
import { AlmacenService } from '@softres/almacen/almacen.service';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { SolicitudEstados } from './enum/solicitud-estados.enum';

@Injectable()
export class CompraService {
  private readonly almacenService: AlmacenService = new AlmacenService();

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

    await getRepository(CotizacionEntity).update(cotizacion.id, {
      status: CotzEstados.GENERADA,
    });

    const result: InformeCompra = {
      compra: createdCompra,
      detalles,
    };

    return result;
  }

  async getById(id: number): Promise<CompraEntity> {
    return await getRepository(CompraEntity).findOne(id);
  }

  async updateCompra(
    id: number,
    compra: UpdateCompraDto,
  ): Promise<UpdateResult> {
    return await getRepository(CompraEntity).update(id, compra);
  }

  async paginateCompra(
    options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    const dataQuery =
      getRepository(SolicitudEntity).createQueryBuilder('compra');

    forIn(options.filters, (value, key) => {
      if (key === 'status') {
        dataQuery.andWhere('( compra.status LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'compra.fecha';
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
    user: LoginIdentityDTO,
  ): Promise<InformeSolicitud> {
    if (user.profile === ProfileTypes.COCINA) {
      solicitud.depto = Deptos.COCINA;
    } else if (user.profile === ProfileTypes.BARRA) {
      solicitud.depto = Deptos.BARRA;
    } else {
      solicitud.depto = Deptos.ALMACEN;
    }

    solicitud.usuarioId = user.id;

    const solicitudToCreate: SolicitudEntity = {
      usuarioId: user.id,
      fecha: solicitud.fecha ? new Date(solicitud.fecha) : moment().toDate(),
      folio: `${moment().format('DDMMYYHH')}${solicitud.depto.substr(0, 2)}`,
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
        abastecido: false,
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

  async updateSolicitud(
    id: number,
    solicitud: UpdateSolicitudDto,
  ): Promise<UpdateResult> {
    if (solicitud.detalle.length !== 0) {
      await getRepository(SolicitudDetalleEntity).delete({ solicitudId: id });

      for (let i = 0; i < solicitud.detalle.length; i++) {
        const registro = solicitud.detalle[i];

        const solicitudDetalle: SolicitudDetalleEntity = {
          cantidad: registro.cantidad,
          insumoId: registro.insumoId,
          solicitudId: id,
          abastecido: false,
        };

        await getRepository(SolicitudDetalleEntity).save(solicitudDetalle);
      }
    }
    return getRepository(SolicitudEntity).update(id, {
      status: SolicitudEstados.GENERADA,
    });
  }

  async deleteSolicitud(id: number): Promise<DeleteResult> {
    await getRepository(SolicitudDetalleEntity).delete({ solicitudId: id });
    return getRepository(SolicitudEntity).delete(id);
  }

  async paginate(
    options: PaginationOptions,
    user: LoginIdentityDTO,
  ): Promise<PaginationPrimeNgResult> {
    if (user.profile === ProfileTypes.COCINA) {
      options.filters.depto = Deptos.COCINA;
    } else if (user.profile === ProfileTypes.BARRA) {
      options.filters.depto = Deptos.BARRA;
    } else if (user.profile === ProfileTypes.COMPRAS) {
      options.filters.status = SolicitudEstados.PARA_COMPRAS;
    }

    const dataQuery = getRepository(SolicitudEntity)
      .createQueryBuilder('solicitud')
      .leftJoin('solicitud.usuario', 'usuario')
      .select([
        'solicitud.id',
        'solicitud.folio',
        'solicitud.fecha',
        'solicitud.status',
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

      if (key === 'depto') {
        dataQuery.andWhere('( solicitud.depto = :term2 )', {
          term2: value,
        });
      }

      if (key === 'status') {
        dataQuery.andWhere('( solicitud.status = :term3 )', {
          term3: value,
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
