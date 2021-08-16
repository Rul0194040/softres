import { AlmacenDetalle } from './almacenDetalle.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { AlmacenType } from '../enums/almacenTypes.enum';

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

  @OneToOne(() => InsumoEntity, { nullable: false })
  insumo: InsumoEntity;

  @Column({ type: 'mediumint', nullable: true })
  insumoId: number;

  @Column({ type: 'mediumint', nullable: true })
  precioVenta: number;

  @Column({
    type: 'decimal',
    default: 0,
  })
  factor: number;

  @Column({
    type: 'mediumint',
    name: 'total',
    nullable: false,
  })
  total: number;
}
