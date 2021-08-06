import { ApiProperty } from '@nestjs/swagger';
import { LoginIdentityDTO } from './loginIdentity.dto';

export class LoginResponseDTO {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  identity: LoginIdentityDTO;
}
