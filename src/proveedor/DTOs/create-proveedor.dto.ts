import { ApiProperty } from '@nestjs/swagger';

export class CreatePoveedorDTO {
  @ApiProperty()
  nombre: string;
}
