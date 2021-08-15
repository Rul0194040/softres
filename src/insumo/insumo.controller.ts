import { DeleteResult, getRepository, UpdateResult } from 'typeorm';
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
import { plainToClass } from 'class-transformer';
import { CreateInsumoDTO } from './DTO/create-insumo.dto';
import { UpdateInsumoDTO } from './DTO/update-insumo.dto';
import { InsumoService } from './insumo.service';

@Controller('insumo')
export class InsumoController {
  constructor(private readonly insumoService: InsumoService) {}

  @Post()
  async createInsumo(@Body() insumo: CreateInsumoDTO): Promise<InsumoEntity> {
    const insumoToCreate = plainToClass(InsumoEntity, insumo);
    console.log(insumoToCreate);
    const created = await getRepository(InsumoEntity).save(insumoToCreate);
    return created;
  }

  @Get(':id')
  async GetInsumoById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<InsumoEntity> {
    return await getRepository(InsumoEntity).findOne(id);
  }

  @Put(':id')
  async updateInsumo(
    @Param('id', ParseIntPipe) id: number,
    @Body() insumo: UpdateInsumoDTO,
  ): Promise<UpdateResult> {
    return await getRepository(InsumoEntity).update(id, insumo);
  }

  @Delete(':id')
  async deleteInsumo(@Param('id') id: number): Promise<DeleteResult> {
    return await getRepository(InsumoEntity).delete(id);
  }
}
