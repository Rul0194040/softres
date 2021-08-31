import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity, Column } from 'typeorm';
import { RecipeValues } from '../recipeValues.enum';

@Entity('recetas')
export class RecetaEntity extends CommonEntity {
  @Column({
    type: 'mediumint',
    name: 'costoTotal',
    nullable: true,
  })
  costoTotal?: number;

  @Column({
    type: 'mediumint',
    name: 'merma',
    nullable: true,
    default: RecipeValues.DEFAULTMERMA,
  })
  merma?: number;

  @Column({
    type: 'mediumint',
    name: 'costoUnitarioReceta',
    nullable: true,
  })
  costoUnitarioReceta?: number;

  @Column({
    type: 'mediumint',
    name: 'factorAlimentos',
    nullable: true,
    default: RecipeValues.FACTOR,
  })
  factorAlimentos?: number;

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
}
