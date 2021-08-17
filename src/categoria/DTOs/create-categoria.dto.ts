import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDTO {
  @ApiProperty()
  nombre: string;
}
