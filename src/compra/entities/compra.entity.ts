import { CotizacionEntity } from './../../cotizacion/entitys/cotizacion.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StatusTypes } from '../enum/statusTypes.enum';
import { CompraDetalleEntity } from './compraDetalles.entity';

@Entity('compras')
export class CompraEntity extends CommonEntity {
  @Column({
    type: 'date',
    nullable: false,
    default: null,
  })
  fecha: Date;

  @Column({
    type: 'text',
    nullable: false,
  })
  folio: string;

  @Column({
    type: 'enum',
    enum: StatusTypes,
    nullable: false,
    default: StatusTypes.BORRADOR,
  })
  status: StatusTypes;

  @ManyToOne(() => CotizacionEntity, { nullable: true })
  cotizacion?: CotizacionEntity;

  @Column({ type: 'smallint', nullable: false })
  cotizacionId: number;

  @OneToMany(() => CompraDetalleEntity, (det) => det.compra, { nullable: true })
  detalleCompra?: CompraDetalleEntity[];
}
