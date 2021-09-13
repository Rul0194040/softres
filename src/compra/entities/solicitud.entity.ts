import { InsumoEntity } from './../../insumo/insumo.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, OneToMany } from 'typeorm';
import { Deptos } from '@softres/almacen/enums/deptos.enum';

@Entity('compras')
export class SolicitudEntity extends CommonEntity {
  @Column({
    type: 'enum',
    enum: Deptos,
    default: Deptos.COCINA,
  })
  depto: Deptos;

  @OneToMany(() => InsumoEntity, (insumo) => insumo.solicitud, {
    nullable: true,
  })
  insumos?: InsumoEntity[];
}
