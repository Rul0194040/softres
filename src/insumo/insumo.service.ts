import { UpdateInsumoDTO } from './DTO/update-insumo.dto';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { CreateInsumoDTO } from './DTO/create-insumo.dto';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { getRepository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class InsumoService {
  async create(insumo: CreateInsumoDTO): Promise<InsumoEntity> {
    const insumoToCreate = plainToClass(InsumoEntity, insumo);
    console.log(insumoToCreate);
    const created = await getRepository(InsumoEntity).save(insumoToCreate);
    return created;
  }

  async getByid(insumoId: number): Promise<InsumoEntity> {
    return await getRepository(InsumoEntity).findOne(insumoId);
  }

  async update(
    insumoId: number,
    insumo: UpdateInsumoDTO,
  ): Promise<UpdateResult> {
    return await getRepository(InsumoEntity).update(insumoId, insumo);
  }

  async delete(insumoId: number): Promise<DeleteResult> {
    return await getRepository(InsumoEntity).delete(insumoId);
  }
}
