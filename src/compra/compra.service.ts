import { CompraDetalleEntity } from './entities/compraDetalles.entity';
import { CompraEntity } from './entities/compra.entity';
import { CompraSolicitudEntity } from './entities/compraSolicitud.entity';
import { CreateCompraDto } from './dto/create-compra.dto';
import { CreateCompraSolicitudDto } from './dto/create-solicitud.dto';
import { getRepository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { plainToClass } from 'class-transformer';
import { UpdateCompraDto } from './dto/update-compra.dto';
import * as moment from 'moment';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { forIn } from 'lodash';

@Injectable()
export class CompraService {
  async create(compra: CreateCompraDto): Promise<CompraEntity> {
    compra.fecha = compra.fecha ? compra.fecha : moment().toDate();
    const createdCompra = await getRepository(CompraEntity).save(compra);

    let sumTotal = 0.0;
    if (compra.detalles && compra.detalles.length !== 0) {
      compra.detalles.forEach(async (detalle) => {
        detalle.compraId = createdCompra.id;
        const detalleToCreate = plainToClass(CompraDetalleEntity, detalle);
        const insumo = await getRepository(InsumoEntity).findOne(
          detalle.insumoId,
        );
        detalleToCreate.insumo = insumo;
        detalleToCreate.total =
          insumo.precioUnitario * detalleToCreate.cantidad;
        sumTotal += detalleToCreate.total;
        await getRepository(CompraDetalleEntity).manager.save(detalleToCreate);
      });
      await getRepository(CompraEntity).update(createdCompra.id, {
        total: sumTotal,
      });
    }
    return createdCompra;
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

  remove(id: number) {
    return `This action removes a #${id} compra`;
  }

  getSolicitud(id: number): Promise<CompraSolicitudEntity> {
    return getRepository(CompraSolicitudEntity).findOne(id, {
      relations: ['detalles'],
    });
  }

  async createSolicitud(
    solicitud: CreateCompraSolicitudDto,
  ): Promise<CompraSolicitudEntity> {
    solicitud.fecha = solicitud.fecha ? solicitud.fecha : moment().toDate();
    const createdSolicitud = await getRepository(CompraSolicitudEntity).save(
      solicitud,
    );
    let sumTotal = 0.0;
    if (solicitud.detalles && solicitud.detalles.length !== 0) {
      solicitud.detalles.forEach(async (orden) => {
        orden.solicitudId = createdSolicitud.id;
        const newOrdenCompra = await this.create(orden);
        sumTotal += newOrdenCompra.total;
      });
      await getRepository(CompraSolicitudEntity).update(createdSolicitud.id, {
        total: sumTotal,
      });
    }
    return getRepository(CompraSolicitudEntity).findOne(createdSolicitud.id);
  }

  async paginateSolicitud(
    options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(CompraSolicitudEntity).createQueryBuilder(
      'solicitud',
    );
    forIn(options.filters, (value, key) => {
      if (key === 'buscar') {
        dataQuery.andWhere('( solicitud.folio LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'solicitud.createdAt';
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
}
