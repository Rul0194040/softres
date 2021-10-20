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
  Param,
  ParseArrayPipe,
  ParseEnumPipe,
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
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { User } from '@softres/user/DTO/user.decorator';
import { ContableDetalleEntity } from './entitys/contableDetalle.entity';
import { CreateContableDetalleDTO } from './DTOs/contableDetalle.dto';
import { ContableEntity } from './entitys/contable.entity';
import { MovType } from './enums/movTypes.enum';

@Controller('almacen')
@ApiTags('Almacén')
@UseGuards(JwtAuthGuard)
export class AlmacenController {
  constructor(private readonly almacenService: AlmacenService) {}

  @Post()
  createAlmacen(@Body() almacen: CreateAlmacenDTO): Promise<AlmacenEntity> {
    return this.almacenService.createAlmacen(almacen);
  }

  @ApiParam({ name: 'tipoMov', enum: MovType })
  @ApiBody({ type: [CreateContableDetalleDTO] })
  @Post('createDetalle/:almacenId/:tipoMov')
  createDetContable(
    @Param('almacenId', ParseIntPipe) almacenId: number,
    @Param('tipoMov', new ParseEnumPipe(MovType)) tipoMov: MovType,
    @Body(new ParseArrayPipe({ items: CreateContableDetalleDTO }))
    detalles: CreateContableDetalleDTO[],
  ): Promise<ContableDetalleEntity[]> {
    return this.almacenService.createDetalle(almacenId, detalles, tipoMov);
  }

  @Post('insumos-minimos')
  insumosMinimos(
    @Body() options: PaginationOptions,
    @User() user: LoginIdentityDTO,
  ): Promise<PaginationPrimeNgResult> {
    return this.almacenService.insMinimos(options, user);
  }

  @Get(':id')
  GetAlmacenById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<AlmacenEntity> {
    return this.almacenService.getById(id);
  }

  @Get('/contable/:insumoId')
  getContableById(
    @Param('insumoId', ParseIntPipe) insumoId: number,
  ): Promise<ContableEntity> {
    return this.almacenService.getContableByInsumo(insumoId);
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

  @Post('paginate')
  paginate(
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.almacenService.paginate(options);
  }

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
  ): Promise<any> {
    return this.almacenService.updateDetalleContable(detalleId, detalle);
  }

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

  @Put('abastecer/:solicitudId')
  async abastecer(
    @Param('solicitudId', ParseIntPipe) solicitudId: number,
  ): Promise<UpdateResult> {
    return this.almacenService.abastecer(solicitudId);
  }
}
