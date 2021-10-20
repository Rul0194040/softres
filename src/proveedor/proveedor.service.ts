import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { ProveedorEntity } from './entity/proveedor.entity';

@Injectable()
export class ProveedorService {
  /**
   * array de objetos proveedor
   * @returns {ProveedorEntity[]}
   */
  getProveedores(): Promise<ProveedorEntity[]> {
    return getRepository(ProveedorEntity).find({ select: ['id', 'nombre'] });
  }
}
