import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompraService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { CreateCompraSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { CompraSolicitudEntity } from './entities/solicitudCompra.entity';

@Controller('compra')
@ApiTags('Compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  create(@Body() createCompraDto: CreateCompraDto) {
    return this.compraService.create(createCompraDto);
  }

  @Get()
  findAll() {
    return this.compraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompraDto: UpdateCompraDto) {
    return this.compraService.update(+id, updateCompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compraService.remove(+id);
  }

  @Post('solicitud')
  createSolicitud(
    @Body() createCompraSolicitud: CreateCompraSolicitudDto,
  ): CompraSolicitudEntity {
    return this.compraService.createSolicitud(createCompraSolicitud);
  }
}
