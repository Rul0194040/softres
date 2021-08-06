import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigKeys } from '@softres/common/enums/configKeys.enum';
import { UserEntity } from '@softres/user/user.entity';
import { UserService } from '@softres/user/user.service';
import { getRepository } from 'typeorm';
import { LoginIdentityDTO } from './DTOs/loginIdentity.dto';
import { LoginResponseDTO } from './DTOs/loginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  validate(email: string, password: string): UserEntity | null {
    const user = this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  async login(
    user: UserEntity,
    rememberme: boolean,
  ): Promise<LoginResponseDTO> {
    const userRecord = await getRepository(UserEntity).findOne({
      where: { id: user.id },
    });

    if (!userRecord) {
      throw new HttpException(
        'Usuario y sucursal no corresponden.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const identity: LoginIdentityDTO = {
      sub: user.id,
      uuid: user.uuid,
      id: user.id,
      profile: user.profile,
      email: user.email,
      firstName: user.firstName,
      rules: user.rules,
      lastName: user.lastName,
      picUrl: user.picUrl,
      createdAt: user.createdAt,
      validEmail: user.validEmail,
    };

    const payload = {
      email: user.email,
      sub: user.uuid,
    };

    const response = {
      //se retorna al front
      access_token: this.jwtService.sign(payload, {
        expiresIn: rememberme
          ? this.configService.get<string>(ConfigKeys.JWT_REMEMBERME_EXPIRATION)
          : this.configService.get<string>(ConfigKeys.JWT_EXPIRATION),
      }),
      identity: identity,
    };

    await getRepository(UserEntity)
      .createQueryBuilder()
      .update({ jwt: response.access_token })
      .where('id=:userId', { userId: user.id })
      .execute();

    return response;
  }

  verify(token: string): UserEntity {
    const decoded = this.jwtService.verify(token, {
      secret: this.configService.get(ConfigKeys.JWT_SECRET),
    });

    const user = this.userService.getUserByEmail(decoded.email);
    if (!user) {
      throw new Error('Error al obtener el token del decodificado');
    }

    return user;
  }
}
