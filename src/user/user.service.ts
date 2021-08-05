import { Injectable } from '@nestjs/common';
import { UserEntity as User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  public getUserByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
}
