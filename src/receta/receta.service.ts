import { BadChild } from './DTO/badChild.dto';
import { AlmacenEntity } from '@softres/almacen/entitys/almacen.entity';
import { AlmacenService } from '@softres/almacen/almacen.service';
import {
  CreateDetalleRecetaDTO,
  CreateRecetaDTO,
} from './DTO/create-receta.dto';
import { forIn } from 'lodash';
import { getRepository, UpdateResult } from 'typeorm';
import { GrupoReceta } from './enums/grupoReceta.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InsumoEntity } from '@softres/insumo/insumo.entity';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { plainToClass } from 'class-transformer';
import { RecetaDetalleEntity } from './entities/recetaDetalle.entity';
import { RecetaEntity } from './entities/receta.entity';
import { RecipeValues } from './enums/recipeValues.enum';
import { UpdateRecetaDTO } from './DTO/update-receta.dto';
import { ContableDetalleEntity } from '@softres/almacen/entitys/contableDetalle.entity';
import { MovType } from '@softres/almacen/enums/tiposMovimientos.enum';

const parseGramos = (kg: number) => kg * 1000;

@Injectable()
export class RecetaService {
  constructor(private readonly almacenService: AlmacenService) {}

  /**
   * Crea una receta,tomamos el objeto que se provee
   * convertimos dicho objeto en una entidad receta
   * si el objeto tiene recetas hijas, las agregamos
   * siempre y cuando esas recetas sean de tipo @enum {(2|3|4)} GrupoReceta
   * luego creamos los detalle de la receta con la funcion de crear detalle
   * @param receta @type {CreateRecetaDTO} receta que vamos a crear
   * @returns @type {RecetaEntity} entidad receta
   */
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

  /**
   * se crean los detalles con determinado id de receta.
   * Se busca la receta, luego recorremos los detalles de receta
   * en cada detalle se busca el insumo,se crea el objeto detalle, se guarda
   * por ultimo se dispara un update de la receta padre
   * @param recetaId @type {number} receta con la que se relacionan los detalles
   * @param detalles @type Array<{CreateDetalleRecetaDTO}> detalles de la receta
   */
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

  /**
   * edita una receta por id
   * @param id id de la receta
   * @param receta @type {UpdateRecetaDto}
   * @returns {UpdateResultDTO}
   */
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

  /**
   * retorna una imagen por id
   * @param id id de la receta
   * @returns {RecetaEntity}
   */
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

  /**
   * Borra una receta por id
   * @param id id de la receta
   * @returns {DeleteResult}
   */
  async delete(id: number): Promise<any> {
    return getRepository(RecetaEntity).delete(id);
  }

  /**
   * funcion que retorna un array de recetas
   * filters [nombre,departamento, grupo]
   * @param options opciones de paginacion
   * @returns @type {PaginationPrimeNgResult} recetas
   */
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

  /**
   * paginate de detalles de receta
   * filtros [nombre]
   * @param recetaId id de la receta
   * @param options opciones de paginacion
   * @returns @type {PaginationPrimeNgResult}
   */
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

  /**
   *funcion que guarda la cadena donde se aloja su img asociada
   * @param recetaId @type {number} id de la receta
   * @param path @type {string} cadena donde se guarda la imagen
   * @returns {UpdateResult}
   */
  updateImage(
    recetaId: number,
    path: string,
  ): UpdateResult | PromiseLike<UpdateResult> {
    return getRepository(RecetaEntity).update(recetaId, { imagen: path });
  }

  /**
   * cocina las recetas y subrecetas usando una funcion
   * llamada @type {cocinarDetalles(RecetaEntity):RecetaDetalleEntity[]}
   * @param recetaId @type {number} id de la receta acocinar
   * @returns {HttpStatus}
   */
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

  /**
   * toma una receta y la recorre para verificar que
   * hay suficiente insumo para cocinar, de esa forma nos aseguramos
   * que la funcion @type {cocinarDetalles(RecetaEntity):RecetaDetalleEntity[]}
   * pueda ser invocada
   * @param receta @type {RecetaEntity} receta
   * @returns {RecetaDetalleEntity[]}
   */
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

  /**
   * funcion que cocina una receta o marca los insuficientes
   * @param receta @type {RecetaEntity}
   * @returns {RecetaDetalleEntity}
   */
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
        await this.almacenService.createDetalle(
          almacen.id,
          [detalleToCreate],
          MovType.PRODUCCION,
        );
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
