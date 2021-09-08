import { Injectable } from '@nestjs/common';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { plainToClass } from 'class-transformer';
import { getRepository, UpdateResult } from 'typeorm';
import { CreateCompraDto } from './dto/create-compra.dto';
import { CreateCompraSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { CompraEntity } from './entities/compra.entity';
import { CompraDetalleEntity } from './entities/compraDetalles.entity';
import { CompraSolicitudEntity } from './entities/solicitudCompra.entity';

@Injectable()
export class CompraService {
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

  remove(id: number) {
    return `This action removes a #${id} compra`;
  }

  createSolicitud(solicitud: CreateCompraSolicitudDto): CompraSolicitudEntity {
    const newSolicitud = getRepository(CompraSolicitudEntity).create(solicitud);
    console.log(newSolicitud);
    console.log(newSolicitud.id);

    let sumTotal = 0.0;
    if (
      newSolicitud.detalleSolicitud &&
      newSolicitud.detalleSolicitud.length !== 0
    ) {
      newSolicitud.detalleSolicitud.forEach(async (orden) => {
        orden.solicitudId = newSolicitud.id;
        const newOrden: CompraEntity = await this.create(orden);
        sumTotal += newOrden.total;
      });
    }
    newSolicitud.total = sumTotal;
    getRepository(CompraSolicitudEntity).update(newSolicitud.id, newSolicitud);
    return newSolicitud;
  }
}
