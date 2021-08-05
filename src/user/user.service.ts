import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  private users: UserEntity[] = [];

  public getUserByEmail(email: string): UserEntity | undefined {
    return this.users.find((user) => user.email === email);
  }
}
