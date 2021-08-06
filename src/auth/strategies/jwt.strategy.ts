import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@softres/user/user.service';
import { UserEntity } from '@softres/user/user.entity';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '@softres/common/enums/configKeys.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ConfigKeys.JWT_SECRET),
    });
  }

  validate(validationPayload: { email: string; password: string }): UserEntity {
    return this.userService.getUserByEmail(validationPayload.email);
  }
}
