import { AlmacenDetalleEntity } from './almacenDetalle.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AlmacenType } from '../enums/almacenTypes.enum';
import { Deptos } from '../enums/deptos.enum';

@Entity('almacen')
export class AlmacenEntity extends CommonEntity {
  @Column({
    type: 'enum',
    enum: AlmacenType,
    default: AlmacenType.PROMEDIOS,
  })
  type: AlmacenType;

  @Column({
    type: 'enum',
    enum: Deptos,
    default: Deptos.COCINA,
  })
  depto: Deptos;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 6,
    scale: 3,
    default: 0.0,
  })
  maximo: number;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 6,
    scale: 3,
    default: 0.0,
  })
  minimo: number;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 3,
    default: 0,
  })
  cantidad: number;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 3,
    nullable: false,
  })
  total: number;

  @ManyToOne(() => InsumoEntity, { nullable: false })
  @JoinColumn()
  insumo: InsumoEntity;

  @Column({ type: 'mediumint', nullable: false })
  insumoId: number;

  @OneToMany(() => AlmacenDetalleEntity, (detalle) => detalle.almacen, {
    nullable: true,
  })
  detalle: AlmacenDetalleEntity[];
}
