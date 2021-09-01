import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCatDTO {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  @IsOptional()
  parentCatId?: number;
}
