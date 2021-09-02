import { ProveedorEntity } from './../proveedor/entity/proveedor.entity';
import { Injectable } from '@nestjs/common';
import { InsumoEntity } from './insumo.entity';
import { Seeder } from 'nestjs-seeder';
import { getRepository } from 'typeorm';
import { insumosToCreate } from './insumo.collection';
import { plainToClass } from 'class-transformer';
import { CategoriaEntity } from '@softres/categoria/categoria.entity';

/**
 * @ignore
 */
@Injectable()
export class InsumosSeeder implements Seeder {
  /**
   * @ignore
   */
  async seed(): Promise<any> {
    for (const insumo of insumosToCreate) {
      const insumoToCreate = plainToClass(InsumoEntity, insumo);
      insumoToCreate.categoria = await getRepository(CategoriaEntity).findOne(
        insumo.categoriaId,
      );
      insumoToCreate.proveedor = await getRepository(ProveedorEntity).findOne(
        insumo.proveedorId,
      );
      if (insumo.subCategoriaId) {
        insumoToCreate.subCategoria = await getRepository(
          CategoriaEntity,
        ).findOne(insumo.subCategoriaId);
      }

      await getRepository(InsumoEntity).save(insumoToCreate);
    }
  }
  /**
   * @ignore
   */
  async drop(): Promise<any> {
    await getRepository(InsumoEntity).delete({});
    return true;
  }
}
