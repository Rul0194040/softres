import { SolicitudDetalleEntity } from './../compra/entities/solicitudDetalle.entity';
import { CotizacionEntity } from './entitys/cotizacion.entity';
import { Injectable } from '@nestjs/common';
import {
  CreateCotizacionDTO,
  DetallesCotizacionDTO,
} from './DTOs/create-cotizacion.dto';
import { getRepository } from 'typeorm';
import { CotizacionDetalleEntity } from './entitys/cotizacionDetalle.entity';
import { InformeCotizacion } from './DTOs/create-informe-cotz.dto';

@Injectable()
export class CotizacionService {
  async create(cotizacion: CreateCotizacionDTO): Promise<InformeCotizacion> {
    const cotizacionToCreate: CotizacionEntity = {
      usuarioAutorizaId: cotizacion.usuarioAutorizaId,
      usuarioCotizaId: cotizacion.usuarioCotizaId,
      fecha: cotizacion.fecha,
      folio: cotizacion.folio,
      solicitudId: cotizacion.solicitudId,
    };

    const createdCotizacion = await getRepository(CotizacionEntity).save(
      cotizacionToCreate,
    );

    const detalles: CotizacionDetalleEntity[] = [];
    const insumosSolicitados = await getRepository(SolicitudDetalleEntity)
      .createQueryBuilder('solDet')
      .leftJoin('solDet.insumo', 'insumo')
      .select([
        'solDet.id',
        'solDet.solicitudId',
        'solDet.cantidad',
        'insumo.id',
        'insumo.nombre',
      ])
      .where('solDet.solicitudId=:id', { id: createdCotizacion.solicitudId })
      .getMany();

    for (let idx = 0; idx < insumosSolicitados.length; idx++) {
      const registro = cotizacion.detalles[idx];

      const detalle: DetallesCotizacionDTO = {
        cotizacionId: createdCotizacion.id,
        insumoId: insumosSolicitados[idx].id,
        proveedor1Id: registro.proveedor1Id,
        precio1: registro.precio1,
        descuento1: registro.descuento1 ? registro.descuento1 : 0,
        proveedor2Id: registro.proveedor2Id,
        precio2: registro.precio2,
        descuento2: registro.descuento2 ? registro.descuento2 : 0,
        proveedor3Id: registro.proveedor3Id,
        precio3: registro.precio3,
        descuento3: registro.descuento3 ? registro.descuento3 : 0,
        proveedorSeleccionadoId: registro.proveedorSeleccionadoId,
        precioSeleccionado: registro.precioSeleccionado,
      };

      detalles[idx] = await getRepository(CotizacionDetalleEntity).save(
        detalle,
      );
    }

    const result: InformeCotizacion = {
      cotizacion: createdCotizacion,
      detalles,
    };

    return result;
  }
}
