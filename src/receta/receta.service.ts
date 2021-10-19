import { BadChild } from './DTO/badChild.dto';
import { AlmacenEntity } from '@softres/almacen/entitys/almacen.entity';
import { AlmacenService } from '@softres/almacen/almacen.service';
import {
  CreateDetalleRecetaDTO,
  CreateRecetaDTO,
} from './DTO/create-receta.dto';
import { DashboardDTO } from './../dashboard/DTOs/dashboard.dto';
import { Deptos } from '@softres/almacen/enums/deptos.enum';
import { forIn } from 'lodash';
import { getRepository, UpdateResult } from 'typeorm';
import { GrupoReceta } from './enums/grupoReceta.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { LoginIdentityDTO } from './../auth/DTOs/loginIdentity.dto';
import { MenuEntity } from './../menu/entitys/menu.entity';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { plainToClass } from 'class-transformer';
import { ProfileTypes } from '@softres/user/profileTypes.enum';
import { RecetaDetalleEntity } from './entities/recetaDetalle.entity';
import { RecetaEntity } from './entities/receta.entity';
import { RecipeValues } from './enums/recipeValues.enum';
import { UpdateRecetaDTO } from './DTO/update-receta.dto';
import { ContableDetalleEntity } from '@softres/almacen/entitys/contableDetalle.entity';

const parseGramos = (kg: number) => kg * 1000;

@Injectable()
export class RecetaService {
  constructor(private readonly almacenService: AlmacenService) {}

  async create(receta: CreateRecetaDTO): Promise<RecetaEntity> {
    const recetaTocreate = plainToClass(RecetaEntity, receta);

    if (receta.children && receta.children.length !== 0) {
      const children = await getRepository(RecetaEntity).findByIds(
        receta.children,
        {
          where: [
            { grupo: GrupoReceta.SUBRECETA },
            { grupo: GrupoReceta.COMPLEMENTO },
            { grupo: GrupoReceta.EXTRA },
          ],
        },
      );
      recetaTocreate.children = children;
    }

    const createdReceta = await getRepository(RecetaEntity).save(
      recetaTocreate,
    );

    if (receta.detalle) {
      this.createDetalle(createdReceta.id, receta.detalle);
    }

    return createdReceta;
  }

  async createDetalle(recetaId: number, detalles: CreateDetalleRecetaDTO[]) {
    let rendimiento = 0;
    let totalCosto = 0;
    let cantReal = 0;
    let unitarioIngrediente = 0;
    const receta = await getRepository(RecetaEntity).findOne(recetaId);
    detalles.forEach(async (detalle) => {
      const insumo = await getRepository(InsumoEntity).findOne(
        detalle.insumoId,
      );

      cantReal = (detalle.cantReceta * 100) / (100.0 - insumo.mermaPorcentaje);
      unitarioIngrediente = (cantReal * insumo.precioKilo) / RecipeValues.KILO;

      const recipeDetail: RecetaDetalleEntity = {
        cantReceta: detalle.cantReceta,
        insumo,
        insumoId: insumo.id,
        cantReal: Number(cantReal.toFixed(2)),
        costoUnitarioIngrediente: Number(unitarioIngrediente.toFixed(2)),
        parentId: recetaId,
        parent: receta,
      };

      totalCosto += recipeDetail.costoUnitarioIngrediente;
      rendimiento += detalle.cantReceta;
      await getRepository(RecetaDetalleEntity).save(recipeDetail);
    });

    const mermaReceta = totalCosto * RecipeValues.DEFAULTMERMA;
    const costoSinIva = (mermaReceta + totalCosto) * RecipeValues.FACTOR;
    const costoIva = costoSinIva + costoSinIva * RecipeValues.IVA;

    await getRepository(RecetaEntity).update(recetaId, {
      costoTotal: Number(totalCosto.toFixed(3)),
      rendimiento: Number(rendimiento.toFixed(3)),
      mermaReceta: Number(mermaReceta.toFixed(3)),
      costoUnitarioReceta: mermaReceta + totalCosto,
      costoSinIva: Number(costoSinIva.toFixed(3)),
      iva: costoSinIva * RecipeValues.IVA,
      costoIva: Number(costoIva.toFixed(3)),
    });
  }

  async update(id: number, receta: UpdateRecetaDTO): Promise<UpdateResult> {
    await getRepository(RecetaEntity).update(
      { parentId: id },
      { parentId: null },
    );
    if (receta.children) {
      const newChildren = await getRepository(RecetaEntity).findByIds(
        receta.children,
        {
          where: [
            { grupo: GrupoReceta.SUBRECETA },
            { grupo: GrupoReceta.COMPLEMENTO },
            { grupo: GrupoReceta.EXTRA },
          ],
        },
      );
      newChildren.forEach(async (child) => {
        await getRepository(RecetaEntity).update(child.id, { parentId: id });
      });
    }

    await getRepository(RecetaDetalleEntity).delete({ parentId: id });
    if (receta.detalle) {
      this.createDetalle(id, receta.detalle);
    }
    return await getRepository(RecetaEntity).update(id, {
      nombre: receta.nombre,
      grupo: receta.grupo,
      numPorciones: receta.numPorciones,
      costoXporcion: receta.costoXporcion,
      precioSugeridoCarta: receta.precioSugeridoCarta,
    });
  }

  async getById(id: number): Promise<RecetaEntity> {
    return getRepository(RecetaEntity)
      .createQueryBuilder('receta')
      .leftJoin('receta.children', 'children')
      .leftJoin('receta.detalle', 'det')
      .leftJoin('det.insumo', 'insumo')
      .select([
        'receta.id',
        'receta.uuid',
        'receta.nombre',
        'receta.depto',
        'receta.numPorciones',
        'receta.costoXporcion',
        'receta.precioSugeridoCarta',
        'children.id',
        'children.nombre',
        'receta.imagen',
        'receta.grupo',
        'det.id',
        'det.insumoId',
        'det.cantReceta',
        'insumo.id',
        'insumo.nombre',
        'insumo.medida',
        'insumo.pesoNeto',
        'insumo.precioKilo',
      ])
      .where('receta.id=:id', { id })
      .getOne();
  }

  async delete(id: number): Promise<any> {
    return getRepository(RecetaEntity).delete(id);
  }

  async dashboard(user: LoginIdentityDTO): Promise<DashboardDTO> {
    let numRecetas = 0,
      numMenu = 0;

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
      if (key === 'grupo') {
        dataQuery.andWhere('( receta.grupo = :term )', {
          term: value,
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

  async cocinar(recetaId: number): Promise<HttpStatus> {
    const receta = await getRepository(RecetaEntity)
      .createQueryBuilder('receta')
      .leftJoin('receta.children', 'subRecetas')
      .leftJoin('receta.detalle', 'detalle')
      .select([
        'receta.id',
        'receta.depto',
        'subRecetas.id',
        'subRecetas.nombre',
        'subRecetas.grupo',
        'detalle.id',
        'detalle.insumoId',
        'detalle.cantReceta',
        'detalle.costoUnitarioIngrediente',
      ])
      .where('receta.id=:id', { id: recetaId })
      .getOne();

    const isInsuficiente: RecetaDetalleEntity[] = await this.cocinarDetalles(
      receta,
    );
    const recetasInsuficientes: BadChild[] = [];

    if (isInsuficiente) {
      throw new HttpException(
        `los insumos no nos permiten cocinar
           porque no son suficientes`,
        HttpStatus.CONFLICT,
      );
    }

    if (receta.detalle && receta.detalle.length !== 0) {
      for (let idx = 0; idx < receta.children.length; idx++) {
        const child = receta.children[idx];
        const badchild = await this.cocinarDetalles(child);

        if (badchild) {
          const resume = {
            id: child.id,
            insumos: badchild,
          };
          recetasInsuficientes.push(resume);
        }
      }

      if (recetasInsuficientes) {
        throw new HttpException(
          `las recetas no nos permiten cocinar
             porque faltan insumos`,
          HttpStatus.CONFLICT,
        );
      }
    }

    if (!isInsuficiente && !recetasInsuficientes) {
      return HttpStatus.OK;
    }
  }

  async verificado(receta: RecetaEntity): Promise<RecetaDetalleEntity[]> {
    const insuficientes: RecetaDetalleEntity[] = [];

    for (let idx = 0; idx < receta.detalle.length; idx++) {
      const detalle = receta.detalle[idx];
      const almacen = await getRepository(AlmacenEntity).findOne({
        depto: receta.depto,
        insumoId: detalle.insumoId,
      });
      const cocinado = parseGramos(almacen.total) - detalle.cantReceta;
      const falta =
        parseGramos(almacen.total) <= detalle.cantReceta ||
        almacen.minimo <= cocinado;
      if (falta) {
        insuficientes.push(detalle);
      }
    }

    return insuficientes;
  }

  async cocinarDetalles(receta: RecetaEntity): Promise<RecetaDetalleEntity[]> {
    const insuficientes = this.verificado(receta);

    if (!insuficientes) {
      for (let idx = 0; idx < receta.detalle.length; idx++) {
        const detalle = receta.detalle[idx];
        const almacen = await getRepository(AlmacenEntity).findOne({
          depto: receta.depto,
          insumoId: detalle.insumoId,
        });

        const detalleToCreate = getRepository(ContableDetalleEntity).create({
          salidas: detalle.cantReceta,
          abono: detalle.costoUnitarioIngrediente,
          precioUnitario: 0,
          saldo: 0,
        });
        await this.almacenService.createDetalle(almacen.id, [detalleToCreate]);
        await getRepository(RecetaEntity).update(receta.id, {
          existencia: parseInt(receta.existencia + '') + 1,
        });
      }
    }
    return insuficientes;
  }

  async validarExistencias(recetaId: number): Promise<boolean> {
    let validator = true;
    const receta = await getRepository(RecetaEntity).findOne(recetaId, {
      relations: ['children', 'detalle'],
    });

    validator = await receta.children.reduce(async (memo, subreceta) => {
      const preValue = await memo;
      const value = await this.validarExistencias(subreceta.id);
      console.log('Subreceta' + subreceta.id + ':' + value);
      return value && preValue;
    }, Promise.resolve(validator));

    console.log(recetaId + ' Validado AllSub:' + validator);

    if (validator) {
      validator = await receta.detalle.reduce(async (memo, detalle) => {
        const preValue = await memo;
        const almacen = await getRepository(AlmacenEntity).findOne({
          depto: receta.depto,
          insumoId: detalle.insumoId,
        });
        console.log(parseGramos(almacen.total) + 'y' + detalle.cantReceta);

        const cocinado = parseGramos(almacen.total) - detalle.cantReceta;
        console.log(detalle.id + 'validado');
        console.log(cocinado >= 0);
        return cocinado >= 0 && preValue;
      }, Promise.resolve(validator));
    }
    console.log(recetaId + ' Validado All:' + validator);

    return validator;
  }
}
