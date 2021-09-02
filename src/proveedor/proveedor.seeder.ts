import { ProveedorEntity } from './entity/proveedor.entity';
import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { plainToClass } from 'class-transformer';
import { getRepository } from 'typeorm';
import { proveedoresToCreate } from './proveedor.collection';

/**
 * @ignore
 */
@Injectable()
export class ProveedorSeeder implements Seeder {
  /**
   * @ignore
   */
  async seed(): Promise<any> {
    for (const proveedor of proveedoresToCreate) {
      const insumoToCreate = plainToClass(ProveedorEntity, proveedor);
      await getRepository(ProveedorEntity).save(insumoToCreate);
    }
  }
  /**
   * @ignore
   */
  async drop(): Promise<any> {
    await getRepository(ProveedorEntity).delete({});
    return true;
  }
}
