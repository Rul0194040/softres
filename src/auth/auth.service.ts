import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '@softres/user/user.entity';
import { UserService } from '@softres/user/user.service';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  validate(email: string, password: string): UserEntity | null {
    const user = this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  login(user: UserEntity): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.uuid,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  verify(token: string): UserEntity {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret,
    });

    const user = this.userService.getUserByEmail(decoded.email);
    if (!user) {
      throw new Error('Unable to get the user from decoded token');
    }

    return user;
  }
}
