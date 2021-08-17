import { CategoriaEntity } from '@softres/categoria/categoria.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { MedidasTypes } from './enums/medidasTypes.enum';
import { UnidadesTypes } from './enums/unidadesTypes.enum';

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
    type: 'enum',
    name: 'medida',
    enum: MedidasTypes,
    nullable: false,
  })
  medida: MedidasTypes;

  @Column({
    type: 'enum',
    name: 'unidad',
    enum: UnidadesTypes,
    nullable: false,
  })
  unidad: UnidadesTypes;

  @Column({
    type: 'varchar',
    name: 'marca',
    length: 100,
    nullable: false,
  })
  marca: string;

  @Column({
    type: 'mediumint',
    name: 'precioUnitario',
    nullable: false,
  })
  precioUnitario: number;

  @ManyToMany(() => CategoriaEntity)
  @JoinTable({
    name: 'insumos_categories',
    joinColumn: {
      name: 'insumo',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'categoria',
      referencedColumnName: 'id',
    },
  })
  categorias: CategoriaEntity[];
}
