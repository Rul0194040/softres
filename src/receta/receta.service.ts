import { UpdateRecetaDTO } from './DTO/update-receta.dto';
import { Injectable } from '@nestjs/common';
import { CreateRecetaDTO } from './DTO/create-receta.dto';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';

@Injectable()
export class RecetaService {
  async create(receta: CreateRecetaDTO): Promise<any> {
    return;
  }
  async update(id: number, receta: UpdateRecetaDTO): Promise<any> {
    return;
  }
  async getById(id: number): Promise<any> {
    return;
  }

  async delete(id: number): Promise<any> {
    return;
  }

  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    return;
  }
}
