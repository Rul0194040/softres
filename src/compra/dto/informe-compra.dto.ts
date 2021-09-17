import { CompraDetalleEntity } from './../entities/compraDetalles.entity';
import { CompraEntity } from './../entities/compra.entity';

export class InformeCompra {
  compra: CompraEntity;
  detalles: CompraDetalleEntity[];
}
