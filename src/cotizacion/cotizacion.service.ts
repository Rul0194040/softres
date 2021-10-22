import { CotizacionDetalleEntity } from './entitys/cotizacionDetalle.entity';
import { CotizacionEntity } from './entitys/cotizacion.entity';
import {
  CreateCotizacionDTO,
  DetallesCotizacionDTO,
} from './DTOs/create-cotizacion.dto';
import { getRepository, UpdateResult } from 'typeorm';
import { InformeCotizacion } from './DTOs/create-informe-cotz.dto';
import { Injectable } from '@nestjs/common';
import { LoginIdentityDTO } from '@softres/auth/DTOs/loginIdentity.dto';
import { plainToClass } from 'class-transformer';
import { UpdateCotizacionDTO } from './DTOs/update-cotizacion.dto';
import * as moment from 'moment';

@Injectable()
export class CotizacionService {
  async create(
    cotizacion: CreateCotizacionDTO,
    user: LoginIdentityDTO,
  ): Promise<InformeCotizacion> {
    const cotizacionToCreate: CotizacionEntity = {
      fecha: cotizacion.fecha ? cotizacion.fecha : moment().toDate(),
      folio: 'C-' + moment().format('DDMMYYHHmm'),
      solicitudId: cotizacion.solicitudId,
      autorizaId: cotizacion.autorizaId,
      cotizaId: user.id,
      formaPago1: cotizacion.formaPago1,
      formaPago2: cotizacion.formaPago2,
      formaPago3: cotizacion.formaPago3,
      factura1: cotizacion.factura1,
      factura2: cotizacion.factura2,
      factura3: cotizacion.factura3,
      total1: cotizacion.total1 ? cotizacion.total1 : 0,
      total2: cotizacion.total2 ? cotizacion.total2 : 0,
      total3: cotizacion.total3 ? cotizacion.total3 : 0,
    };

    const createdCotizacion = await getRepository(CotizacionEntity).save(
      cotizacionToCreate,
    );

    const detalles = await this.createDetalle(
      createdCotizacion.id,
      cotizacion.detalle,
    );

    const result: InformeCotizacion = {
      cotizacion: createdCotizacion,
      detalles,
    };

    return result;
  }

  async createDetalle(
    cotizacionId: number,
    detalles: DetallesCotizacionDTO[],
  ): Promise<CotizacionDetalleEntity[]> {
    const array: CotizacionDetalleEntity[] = [];
    await detalles.reduce(async (memo, detalle) => {
      await memo;

      const detalleToCreate: DetallesCotizacionDTO = {
        cotizacionId,
        insumoId: detalle.insumoId,
        cantidad: detalle.cantidad,
        proveedor1Id: detalle.proveedor1Id,
        precio1: detalle.precio1,
        descuento1: detalle.descuento1 ? detalle.descuento1 : 0,
        proveedor2Id: detalle.proveedor2Id,
        precio2: detalle.precio2,
        descuento2: detalle.descuento2 ? detalle.descuento2 : 0,
        proveedor3Id: detalle.proveedor3Id,
        precio3: detalle.precio3,
        descuento3: detalle.descuento3 ? detalle.descuento3 : 0,
        proveedorSeleccionadoId: detalle.proveedorSeleccionadoId,
        precioSeleccionado: detalle.precioSeleccionado,
      };
      // const mainProveedor = detalleToCreate.proveedorSeleccionadoId;
      // let precio = 0.0,
      //   descuento = 0.0;

      // if (mainProveedor === detalleToCreate.proveedor1Id) {
      //   precio = detalleToCreate.precio1;
      //   descuento = detalleToCreate.descuento1;
      // } else if (mainProveedor === detalleToCreate.proveedor2Id) {
      //   precio = detalleToCreate.precio2;
      //   descuento = detalleToCreate.descuento2;
      // } else if (mainProveedor === detalleToCreate.proveedor3Id) {
      //   precio = detalleToCreate.precio3;
      //   descuento = detalleToCreate.descuento3;
      // }

      //detalleToCreate.precioSeleccionado = precio * (descuento / 100.0);

      const createdDetalle = await getRepository(CotizacionDetalleEntity).save(
        detalleToCreate,
      );
      array.push(createdDetalle);

      return null;
    }, Promise.resolve(null));

    return array;
  }

  getById(id: number) {
    return getRepository(CotizacionEntity).findOne(id, {
      relations: ['detalle', 'detalle.insumo'],
    });
  }

  async update(
    id: number,
    cotizacion: UpdateCotizacionDTO,
  ): Promise<UpdateResult> {
    await getRepository(CotizacionDetalleEntity).delete({ cotizacionId: id });
    await this.createDetalle(id, cotizacion.detalle);
    delete cotizacion.detalle;
    const cotToUpdate: CotizacionEntity = plainToClass(
      CotizacionEntity,
      cotizacion,
    );
    return getRepository(CotizacionEntity).update(id, cotToUpdate);
  }
}
