import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity, Column, OneToMany } from 'typeorm';
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

  @OneToMany(() => RecetaEntity, (receta) => receta.id, { nullable: true })
  children?: RecetaEntity[];

  @OneToMany(() => RecetaDetalleEntity, (det) => det.parent, { nullable: true })
  detalleReceta?: RecetaDetalleEntity[];
}
