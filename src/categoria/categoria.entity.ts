import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity, Column } from 'typeorm';

@Entity('categorias')
export class CategoriaEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    name: 'nombre',
    length: 100,
    nullable: false,
  })
  nombre: string;
}
