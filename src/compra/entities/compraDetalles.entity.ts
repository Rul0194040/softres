import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CompraEntity } from './compra.entity';

@Entity('comprasDetalle')
export class CompraDetalleEntity extends CommonEntity {
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  cantidad: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  total: number;

  @Column({ type: 'mediumint', nullable: false })
  insumoId: number;

  @Column({ type: 'mediumint', nullable: true })
  compraId: number;

  @ManyToOne(() => InsumoEntity, { nullable: true })
  insumo: InsumoEntity;

  @ManyToOne(() => CompraEntity, { nullable: true })
  compra: CompraEntity;
}
