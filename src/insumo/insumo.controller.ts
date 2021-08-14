import { getRepository, UpdateDateColumn } from 'typeorm';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateInsumoDTO } from './DTO/create-insumo.dto';

@Controller('insumo')
export class InsumoController {
  @Post()
  async createInsumo(@Body() insumo: CreateInsumoDTO): Promise<InsumoEntity> {
    const insumoToCreate = plainToClass(InsumoEntity, insumo);
    const created = await getRepository(InsumoEntity).save(insumoToCreate);
    return created;
  }

  @Get(':id')
  async GetInsumoById(
    @Param('insumoId', ParseIntPipe) insumoId: number,
  ): Promise<InsumoEntity> {
    return await getRepository(InsumoEntity).findOne(insumoId);
  }

  @Put(':id')
  async updateInsumo(
    @Param('insumoId', ParseIntPipe) insumoId: number,
    @Body() insumo: CreateInsumoDTO,
  ): Promise<InsumoEntity> {}
}
