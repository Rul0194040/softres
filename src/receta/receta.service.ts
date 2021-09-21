import { LoginIdentityDTO } from './../auth/DTOs/loginIdentity.dto';
import { Injectable } from '@nestjs/common';
import { AlmacenService } from '@softres/almacen/almacen.service';
import { AlmacenEntity } from '@softres/almacen/entitys/almacen.entity';
import { AlmacenDetalleEntity } from '@softres/almacen/entitys/almacenDetalle.entity';
import { Deptos } from '@softres/almacen/enums/deptos.enum';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { plainToClass } from 'class-transformer';
import { forIn } from 'lodash';
import { getRepository, UpdateResult } from 'typeorm';
import { DashboardDTO } from './../dashboard/DTOs/dashboard.dto';
import { MenuEntity } from './../menu/entitys/menu.entity';
import { CreateRecetaDTO } from './DTO/create-receta.dto';
import { UpdateRecetaDTO } from './DTO/update-receta.dto';
import { RecetaEntity } from './entities/receta.entity';
import { RecetaDetalleEntity } from './entities/recetaDetalle.entity';
import { GrupoReceta } from './enums/grupoReceta.enum';
import { RecipeValues } from './enums/recipeValues.enum';
import { ProfileTypes } from '@softres/user/profileTypes.enum';

@Injectable()
export class RecetaService {
  private readonly almacenService: AlmacenService = new AlmacenService();

  async create(receta: CreateRecetaDTO): Promise<RecetaEntity> {
    const recetaTocreate = plainToClass(RecetaEntity, receta);

    if (receta.hasChildren && receta.children.length) {
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

    if (receta.detalles.length) {
      let rendimiento = 0;
      let totalCosto = 0;
      let cantReal = 0;
      let unitarioIngrediente = 0;

      for (let idx = 0; idx < receta.detalles.length; idx++) {
        const record = receta.detalles[idx];
        const insumo = await getRepository(InsumoEntity).findOne(
          record.insumoId,
        );

        cantReal = (record.cantReceta * 100) / (100 - insumo.mermaPorcentaje);
        unitarioIngrediente =
          (cantReal * insumo.precioKilo) / RecipeValues.KILO;

        const recipeDetail: RecetaDetalleEntity = {
          cantReceta: record.cantReceta,
          insumo,
          insumoId: insumo.id,
          cantReal: Number(cantReal.toFixed(2)),
          costoUnitarioIngrediente: Number(unitarioIngrediente.toFixed(2)),
          parent: CreatedReceta,
        };

        totalCosto += recipeDetail.costoUnitarioIngrediente;
        rendimiento += record.cantReceta;

        await getRepository(RecetaDetalleEntity).save(recipeDetail);
      }

      const mermaReceta = totalCosto * RecipeValues.DEFAULTMERMA;
      const costoSinIva = (mermaReceta + totalCosto) * RecipeValues.FACTOR;
      const costoIva = costoSinIva + costoSinIva * RecipeValues.IVA;

      await getRepository(RecetaEntity).update(CreatedReceta.id, {
        costoTotal: Number(totalCosto.toFixed(3)),
        rendimiento: Number(rendimiento.toFixed(3)),
        mermaReceta: Number(mermaReceta.toFixed(3)),
        costoUnitarioReceta: mermaReceta + totalCosto,
        costoSinIva: Number(costoSinIva.toFixed(3)),
        iva: costoSinIva * RecipeValues.IVA,
        costoIva: Number(costoIva.toFixed(3)),
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

  async dashboard(user: LoginIdentityDTO): Promise<DashboardDTO> {
    let numRecetas = 0,
      numMenu = 0;

    console.log(user.profile);

    if (user.profile == ProfileTypes.COCINA) {
      numRecetas = await getRepository(RecetaEntity)
        .createQueryBuilder('receta')
        .where('receta.depto=:depto', { depto: Deptos.COCINA })
        .getCount();
      numMenu = await getRepository(MenuEntity).count({
        where: { depto: Deptos.COCINA },
      });
    }

    if (user.profile == ProfileTypes.BARRA) {
      numRecetas = await getRepository(RecetaEntity).count({
        where: { depto: Deptos.BARRA },
      });
      numMenu = await getRepository(MenuEntity).count({
        where: { depto: Deptos.BARRA },
      });
    }

    const result = {
      recetas: numRecetas,
      menus: numMenu,
    };

    return result;
  }

  async paginate(options: PaginationOptions): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(RecetaEntity)
      .createQueryBuilder('receta')
      .leftJoin('receta.children', 'children')
      .select(['receta', 'children']);

    forIn(options.filters, (value, key) => {
      if (key === 'nombre') {
        dataQuery.andWhere('( receta.nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
      if (key === 'departamento') {
        dataQuery.andWhere('( receta.depto LIKE :term )', {
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
      .orderBy(options.sort, options.direction)
      .getMany();

    return {
      data: data,
      skip: options.skip,
      totalItems: count,
    };
  }

  async paginateDetalle(
    recetaId: number,
    options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    const dataQuery = getRepository(RecetaDetalleEntity)
      .createQueryBuilder('det')
      .leftJoin('det.insumo', 'insumo')
      .leftJoin('det.parent', 'receta')
      .select([
        'det.id',
        'det.cantReceta',
        'det.cantReal',
        'det.costoUnitarioIngrediente',
        'det.createdAt',
        'receta.id',
        'receta.nombre',
        'receta.imagen',
        'insumo.id',
        'insumo.nombre',
        'insumo.nombre',
        'insumo.precioKilo',
        'insumo.mermaPorcentaje',
      ])
      .where('receta.id=:recetaId', { recetaId });

    forIn(options.filters, (value, key) => {
      if (key === 'nombre') {
        dataQuery.andWhere('( receta.nombre LIKE :term )', {
          term: `%${value.split(' ').join('%')}%`,
        });
      }
    });

    if (options.sort === undefined || !Object.keys(options.sort).length) {
      options.sort = 'det.createdAt';
    }

    const count = await dataQuery.getCount();

    const data = await dataQuery
      .skip(options.skip)
      .take(options.take)
      .orderBy(options.sort, options.direction)
      .getMany();

    return {
      data: data,
      skip: options.skip,
      totalItems: count,
    };
  }

  updateImage(
    recetaId: number,
    path: string,
  ): UpdateResult | PromiseLike<UpdateResult> {
    return getRepository(RecetaEntity).update(recetaId, { imagen: path });
  }

  async updateExistencias(recetaId: number): Promise<UpdateResult> {
    const receta = await getRepository(RecetaEntity).findOne(recetaId, {
      relations: ['children', 'detalleReceta'],
    });
    receta.children.forEach((subreceta) => {
      this.updateExistencias(subreceta.id);
    });
    receta.detalleReceta.forEach(async (detalle) => {
      const almacen = await getRepository(AlmacenEntity).findOne({
        insumoId: detalle.insumoId,
      });

      const detalleToCreate = getRepository(AlmacenDetalleEntity).create({
        salidas: detalle.cantReceta,
        abono: detalle.costoUnitarioIngrediente,
        precioUnitario: 0,
        saldo: 0,
      });

      this.almacenService.createDetalle(almacen.id, [detalleToCreate]);
    });
    return getRepository(RecetaEntity).update(receta.id, {
      existencia: parseInt(receta.existencia + '') + 1,
    });
  }
}
