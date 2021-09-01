import { FileOptions } from './../common/DTOs/fileOptions.dto';
import { CreateDetalleDTO } from './DTOs/createDetalleDTO.dto';
import { AlmacenInformeDTO } from './DTOs/almacenInforneDTO.dto';
import { AlmacenService } from './almacen.service';
import { AlmacenEntity } from './entitys/almacen.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateAlmacenDTO } from './DTOs/createAlmacenDTO.dto';
import { UpdateAlmacenDTO } from './DTOs/updateAlmacenDTO.dto';
import { AlmacenDetalleEntity } from './entitys/almacenDetalle.entity';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

@Controller('almacen')
@ApiTags('Almacén')
export class AlmacenController {
  constructor(private readonly almacenService: AlmacenService) {}

  @Post()
  createAlmacen(
    @Body() almacen: CreateAlmacenDTO,
  ): Promise<AlmacenInformeDTO | AlmacenEntity> {
    return this.almacenService.create(almacen);
  }

  @Post('createDetalle/:almacenId')
  createDetAlmacen(
    @Param('almacenId', ParseIntPipe) almacenId: number,
    @Body(new ParseArrayPipe({ items: CreateDetalleDTO }))
    almacen: CreateDetalleDTO[],
  ): Promise<AlmacenDetalleEntity[]> {
    return this.almacenService.createDetalle(almacenId, almacen);
  }

  @Get(':id')
  GetAlmacenById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AlmacenEntity> {
    return this.almacenService.getByid(id);
  }

  @Put(':id')
  updateAlmacen(
    @Param('id', ParseIntPipe) id: number,
    @Body() almacen: UpdateAlmacenDTO,
  ): Promise<UpdateResult> {
    return this.almacenService.update(id, almacen);
  }

  @Delete(':id')
  deleteAlmacen(@Param('id') id: number): Promise<DeleteResult> {
    return this.almacenService.delete(id);
  }

  /**
   * Paginate fisico
   *
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult}
   */
  @Post('paginate')
  paginate(
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.almacenService.paginate(options);
  }

  /**
   * Paginate contable
   *
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult}
   */
  @Post('paginate/contable/:insumoId')
  paginateContable(
    @Param('insumoId', ParseIntPipe) insumoId: number,
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.almacenService.paginateContable(insumoId, options);
  }

  /**
   *
   * @param detalleId Id del detalle ha actualizar
   * @param detalle Acepta solo los campos: entradas, salidas y precioUnitario
   * @returns Confirmación de actualización de costo de venta en la tabla de Almacén
   */
  @Put('updateAlmacenDetalle/:detalleId')
  updateAlmacenDetalle(
    @Param('detalleId', ParseIntPipe) detalleId: number,
    @Body() detalle: CreateDetalleDTO,
  ): Promise<any> {
    return this.almacenService.updateAlmacenDetalle(detalleId, detalle);
  }

  @Post('carga-masiva/:almacenId')
  @UseInterceptors(
    FileInterceptor('carga', {
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
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
  ): Promise<CreateDetalleDTO[]> {
    return await this.almacenService.masiveAlmacen(almacenId, file.path);
  }
}
