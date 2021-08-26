import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity, ManyToOne, Column } from 'typeorm';
import { AlmacenEntity } from './almacen.entity';

@Entity('almacen-Detalle')
export class AlmacenDetalleEntity extends CommonEntity {
  @ManyToOne(() => AlmacenEntity, { nullable: false })
  almacen: AlmacenEntity;

  @Column({
    type: 'int',
    nullable: false,
  })
  almacenId: number;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  referencia: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  entradas: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  salidas: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  existencias: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  precioUnitario: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  precioMedio: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  cargo: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  abono: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  saldo: number;
}
