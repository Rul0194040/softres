import { Deptos } from '@softres/almacen/enums/deptos.enum';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity, Column, OneToMany } from 'typeorm';
import { SeccionEntity } from './section.entity';
@Entity('menus')
export class MenuEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    name: 'nombre',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @Column({
    type: 'enum',
    enum: Deptos,
    default: Deptos.COCINA,
  })
  depto: Deptos;

  @OneToMany(() => SeccionEntity, (seccion) => seccion.menu)
  secciones: SeccionEntity[];
}
