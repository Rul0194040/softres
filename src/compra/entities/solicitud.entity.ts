import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Deptos } from '@softres/almacen/enums/deptos.enum';
import { SolicitudEstados } from '../enum/solicitud-estados.enum';
import { SolicitudDetalleEntity } from './solicitudDetalle.entity';
import { UserEntity } from '@softres/user/user.entity';

@Entity('solicitud')
export class SolicitudEntity extends CommonEntity {
  @ManyToOne(() => UserEntity, { nullable: true })
  usuario?: UserEntity;
  @Column({ type: 'int', nullable: false })
  usuarioId: number;

  @Column({
    type: 'date',
    nullable: false,
    default: null,
  })
  fecha: Date;

  @Column({
    type: 'text',
    nullable: false,
  })
  folio: string;

  @Column({
    type: 'enum',
    enum: Deptos,
    default: Deptos.COCINA,
  })
  depto: Deptos;

  @Column({
    type: 'enum',
    enum: SolicitudEstados,
    nullable: true,
    default: SolicitudEstados.BORRADOR,
  })
  status?: SolicitudEstados;

  @OneToMany(() => SolicitudDetalleEntity, (detalle) => detalle.solicitud, {
    nullable: true,
  })
  detalle?: SolicitudDetalleEntity[];
}
