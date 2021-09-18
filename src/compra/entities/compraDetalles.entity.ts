import { ProveedorEntity } from '@softres/proveedor/entity/proveedor.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CompraEntity } from './compra.entity';

@Entity('comprasDetalle')
export class CompraDetalleEntity extends CommonEntity {
  @Column({
    type: 'decimal',
    nullable: false,
    default: 0.0,
  })
  total: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  cantidad: number;

  @ManyToOne(() => ProveedorEntity, { nullable: false })
  proveedor: ProveedorEntity;

  @Column({ type: 'smallint', nullable: false })
  proveedorId: number;

  @ManyToOne(() => InsumoEntity, { nullable: true })
  insumo?: InsumoEntity;

  @Column({ type: 'smallint', nullable: false })
  insumoId: number;

  @ManyToOne(() => CompraEntity, { nullable: true })
  compra?: CompraEntity;

  @Column({ type: 'smallint', nullable: false })
  compraId: number;
}
