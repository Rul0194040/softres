import { AlmacenDetalleEntity } from './almacenDetalle.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
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

  @OneToMany(() => AlmacenDetalleEntity, (detalle) => detalle.almacen)
  detalle: AlmacenDetalleEntity;

  @Column({
    type: 'enum',
    enum: Deptos,
    default: Deptos.COCINA,
  })
  depto: Deptos;

  @OneToOne(() => InsumoEntity, { nullable: false })
  @JoinColumn()
  insumo: InsumoEntity;

  @Column({ type: 'mediumint', nullable: false })
  insumoId: number;
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  capacidad: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  cantidad: number;

  @Column({
    type: 'mediumint',
    name: 'total',
    nullable: false,
  })
  total: number;
}
