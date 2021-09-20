import { ApiProperty } from '@nestjs/swagger';

export class CreateSeccionDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  parentMenu: number;
  @ApiProperty()
  recetas: number[];
}
