import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '@softres/common/enums/configKeys.enum';
import { createUserDTO } from './DTO/createUser.dto';
import { genSalt, hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { ProfileTypes } from './profileTypes.enum';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Obtiene un usuario por su email
   *
   * @param email del usuario a obtener
   */
  async getByEmail(email: string, profile?: ProfileTypes): Promise<UserEntity> {
    const isUser = getRepository(UserEntity)
      .createQueryBuilder('user')
      .select(['user'])
      .where('user.email = :email', { email })
      .addSelect('user.password');
    if (profile) {
      isUser.andWhere('user.profile = :prof', { prof: profile });
    }
    return isUser.getOne();
  }

  /**
   * Crea un usuario en la base de datos
   *
   * @param user objeto a crear
   */
  async create(userdto: createUserDTO): Promise<UserEntity> {
    //si no trae password, ponerle el default
    if (!userdto.password) {
      userdto.password = this.configService.get<string>(
        ConfigKeys.FIRST_PASSWORD,
      );
    }
    //Encripta el password
    const newHash = await hash(userdto.password, await genSalt(10));
    userdto.password = newHash;

    const usuario: Partial<UserEntity> = {
      email: userdto.email,
      firstName: userdto.firstName,
      lastName: userdto.lastName,
      active: userdto.active,
      rules: userdto.rules,
      profile: userdto.profile,
      password: userdto.password,
    };

    //Guardar el usuario
    const savedUser = await getRepository(UserEntity).save(usuario);

    return savedUser;
  }
}
