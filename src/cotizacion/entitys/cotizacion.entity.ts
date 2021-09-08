import { CotizacionDetalleEntity } from './cotizacionDetalle.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from '@softres/user/user.entity';
import { CotzEstados } from '../cotizacionEstados.enum';

@Entity('cotizacion')
export class CotizacionEntity extends CommonEntity {
  @ManyToOne(() => UserEntity, { nullable: false })
  usuario: UserEntity;
  @Column({ type: 'int', nullable: false })
  usuarioId: number;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  fecha: Date;

  @Column({
    type: 'enum',
    enum: CotzEstados,
    default: CotzEstados.EN_PROCESO,
  })
  depto: CotzEstados;

  @OneToMany(
    () => CotizacionDetalleEntity,
    (cotizacionDetalle) => cotizacionDetalle.cotizacion,
  )
  cotizacionDetalle: CotizacionDetalleEntity;
}
