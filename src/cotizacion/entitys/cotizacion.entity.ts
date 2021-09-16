import { SolicitudEntity } from './../../compra/entities/solicitud.entity';
import { CotizacionDetalleEntity } from './cotizacionDetalle.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@softres/user/user.entity';
import { CotzEstados } from '../cotizacionEstados.enum';

@Entity('cotizacion')
export class CotizacionEntity extends CommonEntity {
  @ManyToOne(() => UserEntity, { nullable: true })
  usuarioCotiza?: UserEntity;
  @Column({ type: 'int', nullable: false })
  usuarioCotizaId: number;

  @ManyToOne(() => UserEntity, { nullable: true })
  usuarioAutoriza?: UserEntity;
  @Column({ type: 'int', nullable: false })
  usuarioAutorizaId: number;

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
    default: CotzEstados.EN_PROCESO,
  })
  status?: CotzEstados;

  @Column({
    type: 'decimal',
    nullable: true,
    default: null,
  })
  TotalP1?: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  facturaP1?: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  formaPagoP1?: boolean;

  @Column({
    type: 'decimal',
    nullable: true,
    default: null,
  })
  TotalP2?: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  facturaP2?: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  formaPagoP2?: boolean;

  @Column({
    type: 'decimal',
    nullable: true,
    default: null,
  })
  totalP3?: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  facturaP3?: boolean;

  @Column({
    type: 'boolean',
    nullable: false,
    default: 0,
  })
  formaPagoP3?: boolean;

  @OneToMany(
    () => CotizacionDetalleEntity,
    (cotizacionDetalle) => cotizacionDetalle.cotizacion,
  )
  cotizacionDetalle?: CotizacionDetalleEntity;

  @ManyToOne(() => SolicitudEntity, { nullable: true })
  solicitud?: SolicitudEntity;

  @Column({ type: 'int', nullable: false })
  solicitudId: number;
}
