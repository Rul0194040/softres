import { SolicitudEntity } from './solicitud.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
@Entity('solicitudDetalle')
export class SolicitudDetalleEntity extends CommonEntity {
  @ManyToOne(() => SolicitudEntity, { nullable: true })
  solicitud?: SolicitudEntity;

  @Column({
    type: 'int',
    nullable: false,
  })
  solicitudId: number;

  @Column({
    type: 'int',
    nullable: false,
    default: null,
  })
  cantidad: number;

  @Column({
    type: 'boolean',
    nullable: true,
    default: false,
  })
  abastecido: boolean;

  @ManyToOne(() => InsumoEntity, { nullable: true })
  insumo?: InsumoEntity;

  @Column({ type: 'int', nullable: true })
  insumoId?: number;
}
