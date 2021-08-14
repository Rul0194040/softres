import { CreateInsumoDTO } from './create-insumo.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateInsumoDTO extends PartialType(CreateInsumoDTO) {}
