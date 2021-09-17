import { CotizacionEntity } from './cotizacion.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, ManyToOne } from 'typeorm';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { ProveedorEntity } from '@softres/proveedor/entity/proveedor.entity';

@Entity('cotizacionDetalle')
export class CotizacionDetalleEntity extends CommonEntity {
  @ManyToOne(() => CotizacionEntity, { nullable: false })
  cotizacion: CotizacionEntity;
  @Column({ type: 'int', nullable: false })
  cotizacionId: number;
  @ManyToOne(() => InsumoEntity, { nullable: false })
  insumo: InsumoEntity;
  @Column({ type: 'int', nullable: false })
  insumoId: number;
  @ManyToOne(() => ProveedorEntity, { nullable: true })
  proveedor1: ProveedorEntity;
  @Column({ type: 'int', nullable: true })
  proveedor1Id: number;
  @ManyToOne(() => ProveedorEntity, { nullable: true })
  proveedor2: ProveedorEntity;
  @Column({ type: 'int', nullable: true })
  proveedor2Id: number;
  @ManyToOne(() => ProveedorEntity, { nullable: true })
  proveedor3: ProveedorEntity;
  @Column({ type: 'int', nullable: true })
  proveedor3Id: number;
  @ManyToOne(() => ProveedorEntity, { nullable: true })
  proveedorSeleccionado: ProveedorEntity;
  @Column({ type: 'int', nullable: true })
  proveedorSeleccionadoId: number;

  @Column({
    type: 'float',
    default: 0,
  })
  precio1: number;
  @Column({
    type: 'float',
    default: 0,
  })
  precio2: number;
  @Column({
    type: 'float',
    default: 0,
  })
  precio3: number;
  @Column({
    type: 'float',
    default: 0,
  })
  precioSeleccionado: number;

  @Column({
    type: 'float',
    default: 0,
  })
  descuento1: number;
  @Column({
    type: 'float',
    default: 0,
  })
  descuento2: number;
  @Column({
    type: 'float',
    default: 0,
  })
  descuento3: number;
}
