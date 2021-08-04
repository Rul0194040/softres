import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity } from 'typeorm';

@Entity('compras')
export class CompraEntity extends CommonEntity {}
