import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

import { ProfileTypes } from '../profileTypes.enum';
/**
 * @ignore
 */
export class createUserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  profile: ProfileTypes;
  @ApiProperty()
  password: string;
  @ApiProperty()
  active?: boolean;
  @ApiProperty()
  rules?: string[];
  @ApiProperty({
    description: 'Telefono del usuario',
  })
  telefono?: string;
}
