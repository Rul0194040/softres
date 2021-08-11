import { Injectable } from '@nestjs/common';
import { UserEntity } from '@softres/user/user.entity';
import { Seeder } from 'nestjs-seeder';
import { getRepository } from 'typeorm';
import { usersToCreate } from './user.collection';

/**
 * @ignore
 */
@Injectable()
export class UsersSeeder implements Seeder {
  /**
   * @ignore
   */
  async seed(): Promise<any> {
    //TODO terminar de implementar el seeder de usuarios
    // let usersCreated: UserEntity[];
    // for (const user of usersToCreate) {
    //   const record: UserEntity = user;
    //   userCreated = await getRepository(UserEntity).save(record);
    // }
    // return usersCreated;
  }
  /**
   * @ignore
   */
  async drop(): Promise<any> {
    await getRepository(UserEntity).delete({});
    return true;
  }
}
