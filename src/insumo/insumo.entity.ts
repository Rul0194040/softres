import { CategoriaEntity } from '@softres/categoria/categoria.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, OneToOne } from 'typeorm';
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

  @OneToOne(() => CategoriaEntity, { nullable: true })
  categoria: CategoriaEntity;

  @Column({
    type: 'int',
    nullable: false,
  })
  categoriaId: number;
}
