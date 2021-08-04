import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { CompraEntity } from '@softres/compras/compra.entity';
import { VentaEntity } from '@softres/ventas/venta.entity';
import { Entity, ManyToOne, Column, OneToOne } from 'typeorm';
import { AlmacenEntity } from './almacen.entity';

@Entity('almacen-Detalle')
export class AlmacenDetalle extends CommonEntity {
  @ManyToOne(() => AlmacenEntity, { nullable: false })
  almacen: AlmacenEntity;

  @Column({
    type: 'int',
    nullable: false,
  })
  almacenId: number;

  @OneToOne(() => VentaEntity, { nullable: true })
  venta?: VentaEntity;

  @Column({
    type: 'int',
    nullable: true,
  })
  ventaId?: number;

  @OneToOne(() => CompraEntity, { nullable: true })
  compra?: CompraEntity;

  @Column({
    type: 'int',
    nullable: true,
  })
  compraId?: number;

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
    default: 0,
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
    default: 0,
  })
  saldo: number;
}
