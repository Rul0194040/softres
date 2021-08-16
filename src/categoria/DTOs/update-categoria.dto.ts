import { CreateCatDTO } from './create-categoria.dto';
import { PartialType } from '@nestjs/swagger';
export class UpdateCatDTO extends PartialType(CreateCatDTO) {}
