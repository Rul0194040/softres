import { CotizacionDetalleEntity } from './../entitys/cotizacionDetalle.entity';
import { CotizacionEntity } from './../entitys/cotizacion.entity';

export class InformeCotizacion {
  cotizacion: CotizacionEntity;
  detalles: CotizacionDetalleEntity[];
}
