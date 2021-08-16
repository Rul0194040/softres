import { AlmacenDetalle } from './../entitys/almacenDetalle.entity';
import { AlmacenEntity } from './../entitys/almacen.entity';
export class AlmacenInformeDTO {
  almacen: AlmacenEntity;
  detalle: AlmacenDetalle[];
}
