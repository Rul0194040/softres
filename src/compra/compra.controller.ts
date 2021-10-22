import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { CompraService } from './compra.service';
import { CreateCompraDTO } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';

@Controller('compra')
@ApiTags('Compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  create(@Body() createCompraDto: CreateCompraDTO) {
    return this.compraService.create(createCompraDto);
  }

  @Post('paginate')
  paginate(@Body() options: PaginationOptions) {
    return this.compraService.paginateCompra(options);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.compraService.getById(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() compra: UpdateCompraDto) {
    return this.compraService.updateCompra(id, compra);
  }
}
