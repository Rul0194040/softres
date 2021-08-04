import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { AlmacenType } from '../almacenTypes.enum';

@Entity('almacen')
export class AlmacenEntity extends CommonEntity {
  @Column({
    type: 'enum',
    enum: AlmacenType,
    default: AlmacenType.PROMEDIOS,
  })
  type: AlmacenType;

  @Column({
    type: 'varchar',
    length: 25,
    nullable: false,
  })
  unidad: string;

  @OneToOne(() => InsumoEntity, { nullable: false })
  insumo: InsumoEntity;

  @Column({ type: 'int', nullable: true })
  insumoId: number;
}
