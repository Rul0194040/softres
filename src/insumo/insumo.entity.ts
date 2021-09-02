import { CategoriaEntity } from '@softres/categoria/categoria.entity';
import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { ProveedorEntity } from '@softres/proveedor/entity/proveedor.entity';
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
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'precioUnitario',
    nullable: false,
  })
  precioUnitario: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'pesoNeto',
    nullable: false,
  })
  pesoNeto: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'pesoDrenado',
    nullable: true,
  })
  pesoDrenado?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'precioKilo',
    nullable: false,
  })
  precioKilo: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'merma',
    nullable: true,
  })
  merma?: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'mermaPorcentaje',
    nullable: false,
  })
  mermaPorcentaje: number;

  @ManyToOne(() => ProveedorEntity, { nullable: true })
  proveedor?: ProveedorEntity;

  @Column({ type: 'int', nullable: true })
  proveedorId?: number;

  @ManyToOne(() => CategoriaEntity, { nullable: true })
  categoria?: CategoriaEntity;

  @Column({ type: 'int', nullable: true })
  categoriaId?: number;

  @ManyToOne(() => CategoriaEntity, { nullable: true })
  subCategoria?: CategoriaEntity;

  @Column({ type: 'int', nullable: true })
  subCategoriaId?: number;
}
