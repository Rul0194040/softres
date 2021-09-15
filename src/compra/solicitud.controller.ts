import { CreateSolicitudDTO } from './dto/create-solicitud.dto';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompraService } from './compra.service';

@Controller('solicitud')
@ApiTags('solicitud')
export class SolicitudController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  create(@Body() solicitud: CreateSolicitudDTO) {
    return this.compraService.createSolicitud(solicitud);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.compraService.getSolicitudById(id);
  }
}
