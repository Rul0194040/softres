import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity } from 'typeorm';

@Entity('insumos')
export class InsumoEntity extends CommonEntity {}
