import { CreateAlmacenDTO } from './createAlmacenDTO.dto';
import { PartialType } from '@nestjs/swagger';
export class UpdateAlmacenDTO extends PartialType(CreateAlmacenDTO) {}
