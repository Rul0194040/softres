import { PartialType } from '@nestjs/swagger';
import { CreateCotizacionDTO } from './create-cotizacion.dto';
export class UpdateCotizacionDTO extends PartialType(CreateCotizacionDTO) {}
