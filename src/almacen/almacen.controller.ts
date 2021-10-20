import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { LoginIdentityDTO } from './../auth/DTOs/loginIdentity.dto';
import { FileOptions } from './../common/DTOs/fileOptions.dto';
import { AlmacenService } from './almacen.service';
import { AlmacenEntity } from './entitys/almacen.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateAlmacenDTO } from './DTOs/createAlmacen.dto';
import { UpdateAlmacenDTO } from './DTOs/updateAlmacenDTO.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { User } from '@softres/user/DTO/user.decorator';
import { ContableDetalleEntity } from './entitys/contableDetalle.entity';
import { CreateContableDetalleDTO } from './DTOs/contableDetalle.dto';
import { ContableEntity } from './entitys/contable.entity';
import { CargaDTO } from './DTOs/carga.dto';

@Controller('almacen')
@ApiTags('Almacén')
@UseGuards(JwtAuthGuard)
export class AlmacenController {
  constructor(private readonly almacenService: AlmacenService) {}

  /**
   * Crea una entrada de almacen digital
   * @param almacen @type {CreateAlmacenDTO}
   * @returns {AlmacenInformeDTO|AlmacenEntity}
   */
  @Post()
  createAlmacen(@Body() almacen: CreateAlmacenDTO): Promise<AlmacenEntity> {
    return this.almacenService.createAlmacen(almacen);
  }

  /**
   * Paginate de insumos minimos
   * @param options opciones de paginacion
   * @param user @type {LoginIdentityDTO} usuario en sesion
   * @returns {PaginationPrimeNgResult}
   */
  @Post('insumos-minimos')
  insumosMinimos(
    @Body() options: PaginationOptions,
    @User() user: LoginIdentityDTO,
  ): Promise<PaginationPrimeNgResult> {
    return this.almacenService.insMinimos(options, user);
  }

  /**
   * paginate de almacenes
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult} array de entradas de almacen
   */
  @Post('paginate')
  paginate(
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.almacenService.paginate(options);
  }

  /**
   * Crea detalles contables
   * @param almacenId id del almacen
   * @param detalles @type {CreateContableDetalleDTO} detalles contables
   * @returns
   */
  @Post('createDetalle/:almacenId')
  createDetContable(
    @Param('almacenId', ParseIntPipe) almacenId: number,
    @Body(new ParseArrayPipe({ items: CreateContableDetalleDTO }))
    detalles: CreateContableDetalleDTO[],
  ): Promise<ContableDetalleEntity[]> {
    return this.almacenService.createDetalle(almacenId, detalles);
  }

  /**
   * retorna una entrada de almacen por id
   * @param id id de almacen
   * @returns {AlmacenEntity}
   */
  @Get(':id')
  GetAlmacenById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AlmacenEntity> {
    return this.almacenService.getById(id);
  }

  /**
   * retorna el almacen contable por insumo
   * @param insumoId id de insumo
   * @returns {ContableEntity}
   */
  @Get('contable/:insumoId')
  getContableById(
    @Param('insumoId', ParseIntPipe) insumoId: number,
  ): Promise<ContableEntity> {
    return this.almacenService.getContableByInsumo(insumoId);
  }

  /**
   * actualia entrada de alamcen
   * @param id id de la entrada de almacen
   * @param almacen objeto con el que se actualiza el registro
   * @returns {UpdateResult}
   */
  @Put(':id')
  updateAlmacen(
    @Param('id', ParseIntPipe) id: number,
    @Body() almacen: UpdateAlmacenDTO,
  ): Promise<UpdateResult> {
    return this.almacenService.update(id, almacen);
  }

  /**
   * Borrar entrada de almacen
   * @param id id de la entrada de almacen
   * @returns {DeleteResult}
   */
  @Delete(':id')
  deleteAlmacen(@Param('id') id: number): Promise<DeleteResult> {
    return this.almacenService.delete(id);
  }

  /**
   * Paginate de movimientos contables
   * filtros [nombre,fecha]
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult} movimientos contables
   */
  @Post('paginate/contable/:contableId')
  paginateContable(
    @Param('contableId', ParseIntPipe) contableId: number,
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.almacenService.paginateContable(contableId, options);
  }

  /**
   *
   * @param detalleId Id del detalle ha actualizar
   * @param detalle Acepta solo los campos: fecha, entradas?, salidas? y precioUnitario?
   * @returns Regresa stock actual y costo venta (suma de los abonos)
   */
  @Put('updateAlmacenDetalle/:detalleId')
  updateDetalleContable(
    @Param('detalleId', ParseIntPipe) detalleId: number,
    @Body() detalle: CreateContableDetalleDTO,
  ): Promise<UpdateResult> {
    return this.almacenService.updateDetalleContable(detalleId, detalle);
  }

  /**
   * funcion que que mueve la existencia de insumos de un origen a un destino
   * dependiendo del tipo
   * @param origenId id del almacen digital de donde sale la mercancia
   * @param destinoId id del almacen digital de a donde va la mercancia
   * @param ware el detalle de @type {CargaDTO} de la mercancia transportada
   * @returns
   */
  @Put('movimiento/:origenId/:destinoId')
  movimiento(
    @Body() ware: CargaDTO,
    @Param('origenId', ParseIntPipe) origenId: number,
    @Param('destinoId', ParseIntPipe) destinoId?: number,
  ): Promise<HttpStatus> {
    return this.almacenService.createMovimiento(origenId, destinoId, ware);
  }

  /**
   * funcion que a traves de un archivo excel agrega
   * los detalles contables a una entrada de almacen
   * @param almacenId id de la entrada de almacen
   * @param file file tipo xls para agregar detalles
   * @returns {CreateContableDetalleDTO[]}
   */
  @Post('carga-masiva/:almacenId')
  @UseInterceptors(
    FileInterceptor('carga', {
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
          'application/wps-office.xlsx',
          'application/wps-office.xls',
        ];

        if (
          allowedTypes.indexOf(file.mimetype) > -1 &&
          (file.originalname.split('.').reverse()[0] === 'xls' ||
            file.originalname.split('.').reverse()[0] === 'xlsx')
        ) {
          return cb(null, true);
        }
        return cb(
          new Error(
            'Tipo de archivo no aceptado, se aceptan solamente xlsx y xls',
          ),
          false,
        );
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dirPath = './uploads/xls';
          if (!existsSync(`${dirPath}`)) {
            mkdirSync(`${dirPath}`, { recursive: true });
          }
          cb(null, dirPath);
        },
        filename: (req, file, cb) => {
          const idPlace = req.params['almacenId'];
          cb(null, `cargaMasiva-${idPlace}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async cargaMasiva(
    @Param('almacenId', ParseIntPipe) almacenId: number,
    @UploadedFile() file: FileOptions,
  ): Promise<CreateContableDetalleDTO[]> {
    return await this.almacenService.masiveAlmacen(almacenId, file.path);
  }
}
