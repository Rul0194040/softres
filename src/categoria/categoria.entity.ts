import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('categoria')
export class CategoriaEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    name: 'nombre',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @ManyToMany(() => InsumoEntity)
  insumo: InsumoEntity;
}
