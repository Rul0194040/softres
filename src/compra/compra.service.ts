import { SolicitudEntity } from './entities/solicitud.entity';
import { CreateSolicitudDTO } from './dto/create-solicitud.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { plainToClass } from 'class-transformer';
import { getRepository, UpdateResult } from 'typeorm';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { CompraEntity } from './entities/compra.entity';
import { CompraDetalleEntity } from './entities/compraDetalles.entity';
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

  async create(createCompraDto: CreateCompraDto): Promise<CompraEntity> {
    const orden: CompraEntity =
      getRepository(CompraEntity).create(createCompraDto);
    let sumTotal = 0.0;
    if (orden.detalleCompra && orden.detalleCompra.length !== 0) {
      orden.detalleCompra.forEach(async (detalle) => {
        detalle.compraId = orden.id;
        const newDetalle: CompraDetalleEntity = plainToClass(
          CompraDetalleEntity,
          detalle,
        );
        newDetalle.insumo = await getRepository(InsumoEntity).findOne(
          newDetalle.insumoId,
        );
        newDetalle.total =
          newDetalle.insumo.precioUnitario * newDetalle.cantidad;
        sumTotal += newDetalle.total;
        await getRepository(CompraDetalleEntity).create(newDetalle);
      });
    }
    orden.total = sumTotal;
    return orden;
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
  ): Promise<SolicitudEntity> {
    const ins = await getRepository(InsumoEntity).findByIds(solicitud.insumos);

    if (!ins) {
      throw new HttpException(
        'no hay insumos que agregar',
        HttpStatus.BAD_REQUEST,
      );
    }

    const solicitudToCreate: SolicitudEntity = {
      fecha: solicitud.fecha ? solicitud.fecha : moment().toDate(),
      folio: `${moment().format('DDMMYYYY')}${solicitud.depto.substr(0, 2)}`,
      depto: solicitud.depto,
      insumos: ins,
    };

    return await getRepository(SolicitudEntity).save(solicitudToCreate);
  }

  async getSolicitudById(id: number): Promise<SolicitudEntity> {
    return await getRepository(SolicitudEntity)
      .createQueryBuilder('solicitud')
      .leftJoin('solicitud.insumos', 'insumos')
      .select(['solicitud', 'insumos'])
      .where('solicitud.id=:id', { id })
      .getOne();
  }
}
