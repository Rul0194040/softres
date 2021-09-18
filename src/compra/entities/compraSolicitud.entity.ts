import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Column, Entity, OneToMany } from 'typeorm';
import { StatusTypes } from '../enum/statusTypes.enum';
import { CompraEntity } from './compra.entity';

@Entity('compraSolicitud')
export class CompraSolicitudEntity extends CommonEntity {
  @Column({
    type: 'date',
    nullable: false,
  })
  fecha: Date;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  folio: string;

  @Column({
    type: 'numeric',
    nullable: false,
    default: 0.0,
  })
  total: number;

  @Column({
    type: 'enum',
    enum: StatusTypes,
    nullable: false,
  })
  status: StatusTypes;

  @OneToMany(() => CompraEntity, (com) => com.solicitud, { nullable: true })
  detalles?: CompraEntity[];
}
