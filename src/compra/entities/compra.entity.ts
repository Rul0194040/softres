import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { ProveedorEntity } from '@softres/proveedor/entity/proveedor.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StatusTypes } from '../enum/statusTypes.enum';
import { CompraDetalleEntity } from './compraDetalles.entity';

@Entity('compras')
export class CompraEntity extends CommonEntity {
  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  fecha: Date;

  @Column({
    type: 'text',
    nullable: false,
  })
  folio: string;

  @Column({
    type: 'decimal',
    nullable: true,
    default: 0.0,
  })
  descuento: number;

  @Column({
    type: 'enum',
    enum: StatusTypes,
    nullable: false,
    default: StatusTypes.BORRADOR,
  })
  status: StatusTypes;

  @Column({
    type: 'decimal',
    nullable: false,
    default: 0.0,
  })
  total: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  pagado: boolean;

  @ManyToOne(() => ProveedorEntity, { nullable: false })
  proveedor?: ProveedorEntity;

  @Column({ type: 'int', nullable: false })
  proveedorId?: number;

  @OneToMany(() => CompraDetalleEntity, (det) => det.compra, { nullable: true })
  detalleCompra?: CompraDetalleEntity[];
}
