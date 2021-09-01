import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { getRepository } from 'typeorm';
import { categoriasToCreate } from './categoria.collection';
import { CategoriaEntity } from './categoria.entity';
import { plainToClass } from 'class-transformer';

/**
 * @ignore
 */
@Injectable()
export class CategoriaSeeder implements Seeder {
  /**
   * @ignore
   */
  async seed(): Promise<any> {
    for (const cat of categoriasToCreate) {
      const catToCreate = plainToClass(CategoriaEntity, cat);
      if (cat.parentCatId) {
        catToCreate.parentCat = await getRepository(CategoriaEntity).findOne(
          cat.parentCatId,
        );
      } else {
        catToCreate.parentCat = null;
      }
      const record: CategoriaEntity = catToCreate;
      await getRepository(CategoriaEntity).save(record);
    }
  }
  /**
   * @ignore
   */
  async drop(): Promise<any> {
    await getRepository(CategoriaEntity).delete({});
    return true;
  }
}
