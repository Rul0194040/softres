import { SolicitudEntity } from '../entities/solicitud.entity';
import { SolicitudDetalleEntity } from './../entities/solicitudDetalle.entity';

export class InformeSolicitud {
  solicitud: SolicitudEntity;
  detalles: SolicitudDetalleEntity[];
}
