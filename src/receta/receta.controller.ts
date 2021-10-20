import { DashboardService } from './../dashboard/dashboard.service';
import { LoginIdentityDTO } from './../auth/DTOs/loginIdentity.dto';
import { DashboardDTO } from './../dashboard/DTOs/dashboard.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRecetaDTO } from './DTO/create-receta.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileOptions } from '@softres/common/DTOs/fileOptions.dto';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { RecetaEntity } from './entities/receta.entity';
import { RecetaService } from './receta.service';
import { UpdateRecetaDTO } from './DTO/update-receta.dto';
import { User } from '@softres/user/DTO/user.decorator';
import { JwtAuthGuard } from '@softres/auth/guards/jwt.guard';

@Controller('receta')
@ApiTags('Receta')
@UseGuards(JwtAuthGuard)
export class RecetaController {
  constructor(
    private readonly recetaService: RecetaService,
    private readonly dashboardService: DashboardService,
  ) {}

  /**
   *  Crea una receta
   * @param receta @type {CreateRecetaDTO}
   * @returns @type {RecetaEntity}
   */
  @Post()
  createReceta(@Body() receta: CreateRecetaDTO): Promise<RecetaEntity> {
    return this.recetaService.create(receta);
  }

  /**
   * Retorna los resultados necesarios para mostrar el dashboard
   * de recetas y menus existentes
   * @param user @type {LoginIdentityDTO}
   * @returns @type {DashboardDTO}
   */
  @Get('dashboard')
  GetDash(@User() user: LoginIdentityDTO): Promise<DashboardDTO> {
    return this.dashboardService.GetDashboard(user);
  }

  /**
   * Paginate de recetas
   *
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult} recetas
   */
  @Post('paginate')
  paginate(
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.recetaService.paginate(options);
  }

  /**
   * Paginate de detalles de una receta
   *
   * @param options opciones de paginacion
   * @param recetaId id de la receta de la cual queremos los detalles
   * @returns {PaginationPrimeNgResult} detalles de una receta
   */
  @Post('paginate/detreceta/:recetaId')
  paginateDetalle(
    @Param('recetaId') recetaid: number,
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.recetaService.paginateDetalle(recetaid, options);
  }

  /**
   * funcion que guarda una imagen en el servidor
   * @param recetaId  @type {number} id de la receta que tiene la imagen
   * @param file @file  el file image
   * @returns {UpdateResult}
   */
  @Post('updateImagen/:recetaId')
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: (req, file, cb) => {
        const allowedTypes = [
          'image/png',
          'image/jpg',
          'image/jpeg',
          'image/gif',
          'image/svg+xml',
        ];

        if (allowedTypes.indexOf(file.mimetype) > -1) {
          return cb(null, true);
        }
        return cb(
          new Error(
            'Tipo de archivo no aceptado, se aceptan solamente png, jpg, jpeg, gif o svg',
          ),
          false,
        );
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          const dirPath = './uploads/recetas';
          if (!existsSync(`${dirPath}`)) {
            mkdirSync(`${dirPath}`, { recursive: true });
          }
          cb(null, dirPath);
        },
        filename: (req, file, cb) => {
          const idPlace = req.params['recetaId'];
          cb(null, `receta-${idPlace}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async image(
    @Param('recetaId', ParseIntPipe) recetaId: number,
    @UploadedFile() file: FileOptions,
  ): Promise<UpdateResult> {
    return this.recetaService.updateImage(recetaId, file.filename);
  }

  /**
   * cocina una receta y sus subrecetas
   * @param recetaId @type {number} id de la receta a cocinar
   * @returns {HttpStatus}
   */
  @Put('cocinar/:recetaId')
  @ApiOperation({
    description:
      'Actualiza las existencias de los almacenes de los insumos a utilizar en la receta',
  })
  async cocinar(
    @Param('recetaId', ParseIntPipe) recetaId: number,
  ): Promise<HttpStatus> {
    return this.recetaService.cocinar(recetaId);
    //return this.recetaService.validarExistencias(recetaId);
  }

  /**
   * retorna la imagen del servidor
   * @param image @type {string} cadena dende se ubica la imagen en el server
   * @returns @file de tipo imagen
   */
  @Get('imagen/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads/recetas' });
  }

  /**
   * get que retorna una receta por id
   * @param id @type {number }id de la receta
   * @returns {RecetaEntity}
   */
  @Get(':id')
  GetRecetaById(@Param('id', ParseIntPipe) id: number): Promise<RecetaEntity> {
    return this.recetaService.getById(id);
  }

  /**
   * edita una receta por id
   * @param id id de la receta
   * @param receta @type {UpdateRecetaDTO} objeto con el que se edita
   * @returns {UpdateResult}
   */
  @Put(':id')
  updateReceta(
    @Param('id', ParseIntPipe) id: number,
    @Body() receta: UpdateRecetaDTO,
  ): Promise<UpdateResult> {
    return this.recetaService.update(id, receta);
  }

  /**
   * Borra una receta por id
   * @param id id de la receta
   * @returns {DeleteResullt}
   */
  @Delete(':id')
  deleteReceta(@Param('id') id: number): Promise<DeleteResult> {
    return this.recetaService.delete(id);
  }
}
