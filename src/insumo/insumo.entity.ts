import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity } from 'typeorm';
import { TypesUnides } from './typesUnidades.enum';

@Entity('insumos')
export class InsumoEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    name: 'nombre',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @Column({
    type: 'varchar',
    name: 'unidad',
    length: 100,
    nullable: false,
  })
  unidad: TypesUnides;

  @Column({
    type: 'varchar',
    name: 'marca',
    length: 100,
    nullable: false,
  })
  marca: string;
}
