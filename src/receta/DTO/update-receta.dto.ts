import { PartialType } from '@nestjs/swagger';
import { CreateRecetaDTO } from './create-receta.dto';

export class UpdateRecetaDTO extends PartialType(CreateRecetaDTO) {}
