import { Injectable } from '@nestjs/common';
import { UserEntity } from '@softres/user/user.entity';
import { Seeder } from 'nestjs-seeder';
import { getRepository } from 'typeorm';
import { usersToCreate } from './user.collection';
import { genSalt, hash } from 'bcryptjs';

/**
 * @ignore
 */
@Injectable()
export class UsersSeeder implements Seeder {
  /**
   * @ignore
   */
  async seed(): Promise<any> {
    for (const user of usersToCreate) {
      const record: UserEntity = user;
      const theHash = await hash(record.password, await genSalt(10));
      record.password = theHash;
      await getRepository(UserEntity).save(record);
    }
  }
  /**
   * @ignore
   */
  async drop(): Promise<any> {
    await getRepository(UserEntity).delete({});
    return true;
  }
}
