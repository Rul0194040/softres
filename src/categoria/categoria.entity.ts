import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

@Entity('categorias')
export class CategoriaEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    name: 'nombre',
    length: 100,
    nullable: false,
  })
  nombre: string;

  @ManyToOne(() => CategoriaEntity, { nullable: true })
  @JoinColumn()
  parentCat: CategoriaEntity;

  @Column({ type: 'mediumint', nullable: true })
  parentCatId: number;
}
