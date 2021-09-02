import { RecetaEntity } from './receta.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('recetasDetalle')
export class RecetaDetalleEntity extends CommonEntity {
  @Column({
    type: 'mediumint',
    name: 'cantReal',
    nullable: true,
  })
  cantReal?: number;

  @Column({
    type: 'mediumint',
    name: 'cantReceta',
    nullable: false,
  })
  cantReceta: number;

  @Column({
    type: 'mediumint',
    name: 'costoUnitarioReceta',
    nullable: false,
  })
  costoUnitarioIngrediente: number;

  @OneToOne(() => InsumoEntity, { nullable: false })
  @JoinColumn()
  insumo: InsumoEntity;

  @Column({ type: 'mediumint', nullable: true })
  insumoId?: number;

  @ManyToOne(() => RecetaEntity, { nullable: false })
  parent: RecetaEntity;

  @Column({ type: 'mediumint', nullable: true })
  recetaId?: number;
}
