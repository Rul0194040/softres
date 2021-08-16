import { DeleteResult, UpdateResult } from 'typeorm';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateInsumoDTO } from './DTO/create-insumo.dto';
import { UpdateInsumoDTO } from './DTO/update-insumo.dto';
import { InsumoService } from './insumo.service';

@Controller('insumo')
export class InsumoController {
  constructor(private readonly insumoService: InsumoService) {}

  @Post()
  createInsumo(@Body() insumo: CreateInsumoDTO): Promise<InsumoEntity> {
    return this.insumoService.create(insumo);
  }

  @Get(':id')
  GetInsumoById(@Param('id', ParseIntPipe) id: number): Promise<InsumoEntity> {
    return this.insumoService.getByid(id);
  }

  @Put(':id')
  updateInsumo(
    @Param('id', ParseIntPipe) id: number,
    @Body() insumo: UpdateInsumoDTO,
  ): Promise<UpdateResult> {
    return this.insumoService.update(id, insumo);
  }

  @Delete(':id')
  deleteInsumo(@Param('id') id: number): Promise<DeleteResult> {
    return this.insumoService.delete(id);
  }
}