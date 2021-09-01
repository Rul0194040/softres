import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity('recetas')
export class RecetaEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    name: 'nombre',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @Column({
    type: 'mediumint',
    name: 'costoTotal',
    nullable: true,
  })
  costoTotal?: number;

  @Column({
    type: 'mediumint',
    name: 'costoUnitarioReceta',
    nullable: true,
  })
  costoUnitarioReceta?: number;

  @Column({
    type: 'mediumint',
    name: 'costoIva',
    nullable: true,
  })
  costoIva?: number;

  @Column({
    type: 'mediumint',
    name: 'costoSinIva',
    nullable: true,
  })
  costoSinIva?: number;

  @Column({
    type: 'mediumint',
    name: 'precioSugeridoCarta',
    nullable: true,
  })
  precioSugeridoCarta?: number;

  @Column({
    type: 'boolean',
    name: 'haschildren',
    nullable: true,
  })
  hasChildren?: boolean;

  @OneToMany(() => RecetaEntity, (receta) => receta.id, { nullable: true })
  children?: RecetaEntity[];
}
