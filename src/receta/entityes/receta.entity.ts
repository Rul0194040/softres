import { SeccionEntity } from './../../menu/entitys/section.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { GrupoReceta } from '../enums/grupoReceta.enum';
import { RecetaDetalleEntity } from './recetaDetalle.entity';

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
    type: 'varchar',
    name: 'descripcion',
    length: 100,
    nullable: true,
  })
  descripcion?: string;

  @Column({
    type: 'mediumint',
    name: 'numPorciones',
    nullable: true,
  })
  numPorciones?: number;

  @Column({
    type: 'mediumint',
    name: 'costoXporcion',
    nullable: true,
  })
  costoXporcion?: number;

  @Column({
    type: 'mediumint',
    name: 'rendimiento',
    nullable: true,
  })
  rendimiento?: number;

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
    name: 'mermaReceta',
    nullable: true,
  })
  mermaReceta?: number;

  @Column({
    type: 'mediumint',
    name: 'iva',
    nullable: true,
  })
  iva?: number;

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
    nullable: false,
  })
  hasChildren: boolean;

  @Column({
    type: 'enum',
    name: 'grupo',
    enum: GrupoReceta,
    nullable: true,
  })
  grupo?: GrupoReceta;

  @OneToMany(() => RecetaEntity, (receta) => receta.parent, { nullable: true })
  children: RecetaEntity[];

  @Column({ type: 'int', nullable: true })
  parentId: number;

  @ManyToOne(() => RecetaEntity, (receta) => receta.children)
  @JoinColumn({ name: 'parentId' })
  parent: RecetaEntity;

  @OneToMany(() => RecetaDetalleEntity, (det) => det.parent, { nullable: true })
  detalleReceta?: RecetaDetalleEntity[];

  @ManyToOne(() => SeccionEntity, (seccion) => seccion.recetas, {
    nullable: true,
  })
  seccion?: SeccionEntity;

  @Column({ type: 'int', nullable: true })
  seccionId?: number;
}
