import { ContableDetalleEntity } from './contableDetalle.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity('Contable')
export class ContableEntity extends CommonEntity {
  @OneToOne(() => InsumoEntity, { nullable: false })
  insumo: InsumoEntity;

  @Column({ type: 'mediumint', nullable: false })
  insumoId: number;

  @OneToMany(() => ContableDetalleEntity, (detalle) => detalle.parentContable, {
    nullable: true,
  })
  detalle: ContableDetalleEntity[];
}
