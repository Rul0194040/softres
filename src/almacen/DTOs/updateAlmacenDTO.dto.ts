import { CreateAlmacenDTO } from './createAlmacen.dto';
import { PartialType } from '@nestjs/swagger';
export class UpdateAlmacenDTO extends PartialType(CreateAlmacenDTO) {}
