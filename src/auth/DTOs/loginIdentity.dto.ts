import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class LoginIdentityDTO {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  uuid: string;
  @ApiProperty()
  @IsNumber()
  sub: number;
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsString()
  profile: string;
  @ApiProperty()
  @IsString()
  rules: string[];
  @ApiProperty()
  @IsString()
  picUrl: string;
  @ApiProperty()
  @IsDate()
  createdAt: Date;
  @ApiProperty()
  @IsBoolean()
  validEmail: boolean;
}
