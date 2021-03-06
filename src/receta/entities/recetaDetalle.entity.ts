import { RecetaEntity } from './receta.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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
    name: 'costoUnitarioIngrediente',
    nullable: false,
  })
  costoUnitarioIngrediente: number;

  @ManyToOne(() => InsumoEntity, { nullable: true })
  insumo: InsumoEntity;

  @Column({ type: 'mediumint', nullable: false })
  insumoId?: number;

  @ManyToOne(() => RecetaEntity, { nullable: true })
  parent: RecetaEntity;

  @Column({ type: 'mediumint', nullable: false })
  parentId?: number;
}
