import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { ProveedorEntity } from '@softres/proveedor/entity/proveedor.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PagoTypes } from '../enum/pagoTypes.enum';
import { StatusTypes } from '../enum/statusTypes.enum';
import { CompraDetalleEntity } from './compraDetalles.entity';
import { CompraSolicitudEntity } from './solicitudCompra.entity';

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

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  factura: boolean;

  @Column({
    type: 'enum',
    enum: PagoTypes,
    nullable: false,
    default: PagoTypes.CREDITO,
  })
  formaPago: PagoTypes;

  @Column({
    type: 'date',
    nullable: true,
  })
  fechaEntrega: Date;

  @Column({ type: 'int', nullable: false })
  proveedorId: number;

  @Column({ type: 'int', nullable: false })
  solicitudId: number;

  @OneToMany(() => CompraDetalleEntity, (det) => det.compra, { nullable: true })
  detalleCompra?: CompraDetalleEntity[];

  @ManyToOne(() => ProveedorEntity, { nullable: false })
  proveedor?: ProveedorEntity;

  @ManyToOne(() => CompraSolicitudEntity, { nullable: false })
  solicitud: CompraSolicitudEntity;
}
