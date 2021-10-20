import { ContableDetalleEntity } from './contableDetalle.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('contable')
export class ContableEntity extends CommonEntity {
  @OneToOne(() => InsumoEntity, { nullable: true })
  @JoinColumn()
  insumo: InsumoEntity;

  @Column({ type: 'mediumint', nullable: false })
  insumoId: number;

  @OneToMany(() => ContableDetalleEntity, (detalle) => detalle.contable, {
    nullable: true,
  })
  detalle: ContableDetalleEntity[];
}
