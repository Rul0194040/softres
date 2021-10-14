import { ContableEntity } from './contable.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity('ContableDetalle')
export class ContableDetalleEntity extends CommonEntity {
  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  fecha: Date;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  referencia: string;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 3,
    default: 0.0,
  })
  entradas: number;

  @Column({
    type: 'decimal',
    precision: 6,
    scale: 3,
    default: 0.0,
  })
  salidas: number;

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
    precision: 6,
    scale: 3,
    default: 0.0,
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
    nullable: false,
  })
  saldo: number;

  @ManyToOne(() => ContableEntity, { nullable: true })
  parentContable: ContableEntity;

  @Column({ type: 'mediumint', nullable: false })
  parentContableId?: number;
}
