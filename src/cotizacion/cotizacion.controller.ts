import { CotizacionService } from './cotizacion.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCotizacionDTO } from './DTOs/create-cotizacion.dto';

@Controller('Cotización')
@ApiTags('cotizacion')
export class CotizacionController {
  constructor(private readonly cotizacionService: CotizacionService) {}

  @Post()
  create(@Body() cotizacion: CreateCotizacionDTO) {
    return this.cotizacionService.create(cotizacion);
  }
}
