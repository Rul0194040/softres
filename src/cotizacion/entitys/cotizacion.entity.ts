import { SolicitudEntity } from './../../compra/entities/solicitud.entity';
import { CotizacionDetalleEntity } from './cotizacionDetalle.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@softres/user/user.entity';
import { CotzEstados } from '../cotizacionEstados.enum';

/**
 *  Formas de pago:
 */
@Entity('cotizacion')
export class CotizacionEntity extends CommonEntity {
  @Column({
    type: 'text',
    nullable: false,
  })
  folio?: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  fecha?: Date;

  @Column({
    type: 'enum',
    enum: CotzEstados,
    default: CotzEstados.BORRADOR,
  })
  status?: CotzEstados;

  @Column({
    type: 'decimal',
    nullable: true,
    default: null,
  })
  total1?: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  factura1?: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  formaPago1?: boolean;

  @Column({
    type: 'decimal',
    nullable: true,
    default: null,
  })
  total2?: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  factura2?: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  formaPago2?: boolean;

  @Column({
    type: 'decimal',
    nullable: true,
    default: null,
  })
  total3?: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  factura3?: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  formaPago3?: boolean;

  @ManyToOne(() => SolicitudEntity, { nullable: true })
  solicitud?: SolicitudEntity;

  @Column({ type: 'int', nullable: false })
  solicitudId: number;

  @ManyToOne(() => UserEntity, { nullable: true })
  cotiza?: UserEntity;

  @Column({ type: 'int', nullable: false })
  cotizaId: number;

  @ManyToOne(() => UserEntity, { nullable: true })
  autoriza?: UserEntity;

  @Column({ type: 'int', nullable: false })
  autorizaId: number;

  @OneToMany(() => CotizacionDetalleEntity, (detalle) => detalle.cotizacion)
  detalle?: CotizacionDetalleEntity;
}
