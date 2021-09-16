import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { CompraService } from './compra.service';
import { CreateCompraDto } from './dto/create-compra.dto';
import { CreateCompraSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { CompraSolicitudEntity } from './entities/compraSolicitud.entity';

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

  @Get('solicitud/:id')
  getSolicitud(@Param('id') id: number): Promise<CompraSolicitudEntity> {
    return this.compraService.getSolicitud(id);
  }

  @Post('solicitud')
  createSolicitud(
    @Body() createCompraSolicitud: CreateCompraSolicitudDto,
  ): Promise<CompraSolicitudEntity> {
    return this.compraService.createSolicitud(createCompraSolicitud);
  }

  /**
   * Paginate contable
   *
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult}
   */
  @Post('solicitud/paginate')
  @ApiOperation({
    description:
      '**Filtros válidos:**\n_buscar_: Busca por folio de solicitud ',
  })
  paginateContable(
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.compraService.paginateSolicitud(options);
  }
}
