import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('recetasDetalle')
export class RecetaDetalleEntity extends CommonEntity {
  @Column({
    type: 'mediumint',
    name: 'rendimiento',
    nullable: false,
  })
  rendimiento: number;

  @Column({
    type: 'mediumint',
    name: 'numPorciones',
    nullable: false,
  })
  numPorciones: number;

  @Column({
    type: 'mediumint',
    name: 'numXporcion',
    nullable: false,
  })
  numXporcion: number;

  @Column({
    type: 'varchar',
    name: 'nombre',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @Column({
    type: 'mediumint',
    name: 'cantReceta',
    nullable: false,
  })
  cantReceta: number;

  @Column({
    type: 'mediumint',
    name: 'cantReal',
    nullable: false,
  })
  cantReal: number;

  @Column({
    type: 'mediumint',
    name: 'precioMercado',
    nullable: false,
  })
  precioMercado: number;

  @OneToOne(() => InsumoEntity, { nullable: false })
  @JoinColumn()
  insumo: InsumoEntity;

  @Column({ type: 'mediumint', nullable: false })
  insumoId: number;
}
