import { MenuEntity } from './menu.entity';
import { RecetaEntity } from './../../receta/entities/receta.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('secciones')
export class SeccionEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    name: 'nombre',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @OneToMany(() => RecetaEntity, (receta) => receta.seccion)
  recetas: RecetaEntity[];

  @ManyToOne(() => MenuEntity, (menu) => menu.secciones, {
    nullable: true,
  })
  menu?: MenuEntity;

  @Column({ type: 'int', nullable: false })
  menuId: number;
}
