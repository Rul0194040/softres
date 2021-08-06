import { ApiProperty } from '@nestjs/swagger';
import { ProfileTypes } from '@softres/user/profileTypes.enum';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
/**
 * @ignore
 */
export class LoginDTO {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  rememberme: boolean;

  @ApiProperty()
  @IsOptional()
  scope: ProfileTypes;
}
