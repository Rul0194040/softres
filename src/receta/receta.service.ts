import { RecetaDetalleEntity } from './entityes/recetaDetalle.entity';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { RecetaEntity } from './entityes/receta.entity';
import { getRepository, UpdateResult } from 'typeorm';
import { UpdateRecetaDTO } from './DTO/update-receta.dto';
import { Injectable } from '@nestjs/common';
import { CreateRecetaDTO } from './DTO/create-receta.dto';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { plainToClass } from 'class-transformer';
import { forIn } from 'lodash';
import { GrupoReceta } from './enums/grupoReceta.enum';
import { RecipeValues } from './enums/recipeValues.enum';

@Injectable()
export class RecetaService {
  async create(receta: CreateRecetaDTO): Promise<RecetaEntity> {
    const recetaTocreate = plainToClass(RecetaEntity, receta);
    if (receta.children) {
      const children = await getRepository(RecetaEntity).findByIds(
        receta.children,
        {
          where: [
            { hasChildren: false, grupo: GrupoReceta.SUBRECETA },
            { hasChildren: false, grupo: GrupoReceta.EXSUBRES },
          ],
        },
      );
      recetaTocreate.children = children;
    }

    const CreatedReceta = await getRepository(RecetaEntity).save(
      recetaTocreate,
    );

    if (receta.detalles) {
      let rendimiento: number, totalCosto: number;
      for (let idx = 0; idx < receta.detalles.length; idx++) {
        const record = receta.detalles[idx];
        const insumo = await getRepository(InsumoEntity).findOne(
          record.insumoId,
        );
        const cantReal =
          (record.cantReal * 100) / (100 - insumo.mermaPorcentaje);
        const recipeDetail: RecetaDetalleEntity = {
          cantReceta: record.cantReceta,
          insumo,
          insumoId: insumo.id,
          cantReal,
          costoUnitarioIngrediente:
            (cantReal * insumo.precioKilo) / RecipeValues.KILO,
          parent: CreatedReceta,
        };

        totalCosto += recipeDetail.costoUnitarioIngrediente;
        rendimiento += record.cantReceta;
      }

      const mermaReceta = totalCosto * RecipeValues.DEFAULTMERMA;
      const costoSinIva = (mermaReceta + totalCosto) * RecipeValues.FACTOR;
      const costoIva = costoSinIva + costoSinIva * RecipeValues.IVA;

      await getRepository(RecetaEntity).update(CreatedReceta.id, {
        costoTotal: totalCosto,
        rendimiento,
        mermaReceta,
        costoUnitarioReceta: mermaReceta + totalCosto,
        costoSinIva,
        iva: costoSinIva * RecipeValues.IVA,
        costoIva,
        precioSugeridoCarta: costoIva + costoIva * receta.precioSugeridoCarta,
      });

      return CreatedReceta;
    }
  }
  async update(id: number, receta: UpdateRecetaDTO): Promise<UpdateResult> {
    if (receta.children) {
      const newChildren = await getRepository(RecetaEntity).findByIds(
        receta.children,
        {
          where: [
            { hasChildren: false, grupo: GrupoReceta.SUBRECETA },
            { hasChildren: false, grupo: GrupoReceta.EXSUBRES },
          ],
        },
      );
      return await getRepository(RecetaEntity).update(id, {
        children: newChildren,
      });
    }

    return await getRepository(RecetaEntity).update(id, {
      precioSugeridoCarta: receta.precioSugeridoCarta,
    });
  }
  async getById(id: number): Promise<any> {
    return getRepository(RecetaEntity).findOne(id);
  }

  async delete(id: number): Promise<any> {
    return getRepository(RecetaEntity).delete(id);
  }

  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(RecetaEntity)
      .createQueryBuilder('receta')
      .leftJoin('receta.children', 'children')
      .select(['receta', 'children.id', 'children.nombre']);

    forIn(options.filters, (value, key) => {
      if (key === 'nombre') {
        dataQuery.andWhere('( receta.nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'receta.createdAt';
    }

    const count = await dataQuery.getCount();

    const data = await dataQuery
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.sort, 'DESC')
      .getMany();

    return {
      data: data,
      skip: options.skip,
      totalItems: count,
    };
  }
}
