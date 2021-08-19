import { AlmacenDetalle } from './almacenDetalle.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
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

  @OneToMany(() => AlmacenDetalle, (detalle) => detalle.almacen)
  detalle: AlmacenDetalle;

  @Column({
    type: 'enum',
    enum: Deptos,
    nullable: true,
  })
  depto: Deptos;

  @OneToOne(() => InsumoEntity, { nullable: false })
  insumo: InsumoEntity;

  @Column({ type: 'mediumint', nullable: false })
  insumoId: number;

  @Column({
    type: 'decimal',
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

  @Column({ type: 'mediumint', nullable: true })
  precioVenta: number;

  @Column({
    type: 'mediumint',
    name: 'total',
    nullable: false,
  })
  total: number;
}
