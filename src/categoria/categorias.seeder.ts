import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { getRepository } from 'typeorm';
import { categoriasToCreate } from './categoria.collection';
import { CategoriaEntity } from './categoria.entity';

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
      const record: CategoriaEntity = cat;
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
