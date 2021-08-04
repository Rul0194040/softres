import { CommonEntity } from '@softres/common/commonEntity.abstract';
import { Entity } from 'typeorm';

@Entity('ventas')
export class VentaEntity extends CommonEntity {}
