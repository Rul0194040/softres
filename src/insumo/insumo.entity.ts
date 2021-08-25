import { CategoriaEntity } from '@softres/categoria/categoria.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { MedidasTypes } from './enums/medidasTypes.enum';
import { UnidadesTypes } from './enums/unidadesTypes.enum';

@Entity('insumos')
@Index(['nombre', 'marca'], { unique: true })
export class InsumoEntity extends CommonEntity {
  @Index({ fulltext: true })
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
    nullable: true,
  })
  medida?: MedidasTypes;

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

  @ManyToOne(() => CategoriaEntity, { nullable: true })
  categoria?: CategoriaEntity;

  @Column({ type: 'int', nullable: true })
  categoriaId?: number;
}
