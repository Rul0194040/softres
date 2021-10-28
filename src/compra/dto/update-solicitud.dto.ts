import { PartialType } from '@nestjs/swagger';
import { CreateSolicitudDTO } from './create-solicitud.dto';

export class UpdateSolicitudDto extends PartialType(CreateSolicitudDTO) {}
