import { PartialType } from '@nestjs/swagger';
import { CreateCompraDTO } from './create-compra.dto';

export class UpdateCompraDto extends PartialType(CreateCompraDTO) {}
