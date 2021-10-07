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
  constructor(private readonly recetaService: RecetaService) {}

  @Post()
  createReceta(@Body() receta: CreateRecetaDTO): Promise<RecetaEntity> {
    return this.recetaService.create(receta);
  }

  @Get('dashboard')
  GetDash(@User() user: LoginIdentityDTO): Promise<DashboardDTO> {
    return this.recetaService.dashboard(user);
  }

  @Get('imagen/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './uploads/recetas' });
  }

  @Get(':id')
  GetRecetaById(@Param('id', ParseIntPipe) id: number): Promise<RecetaEntity> {
    return this.recetaService.getById(id);
  }

  @Put(':id')
  updateReceta(
    @Param('id', ParseIntPipe) id: number,
    @Body() receta: UpdateRecetaDTO,
  ): Promise<UpdateResult> {
    return this.recetaService.update(id, receta);
  }

  @Delete(':id')
  deleteReceta(@Param('id') id: number): Promise<DeleteResult> {
    return this.recetaService.delete(id);
  }

  /**
   * Paginate
   *
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult}
   */
  @Post('paginate')
  paginate(
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.recetaService.paginate(options);
  }

  /**
   * Paginate
   *
   * @param options opciones de paginacion
   * @returns {PaginationPrimeNgResult}
   */
  @Post('paginate/detreceta/:recetaId')
  paginateDetalle(
    @Param('recetaId') recetaid: number,
    @Body() options: PaginationOptions,
  ): Promise<PaginationPrimeNgResult> {
    return this.recetaService.paginateDetalle(recetaid, options);
  }

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

  @Get('updateExistencia/:recetaId')
  @ApiOperation({
    description:
      'Actualiza las existencias de los almacenes de los insumos a utilizar en la receta',
  })
  async cocinar(
    @Param('recetaId', ParseIntPipe) recetaId: number,
  ): Promise<HttpStatus> {
    return this.recetaService.cocinar(recetaId);
  }
}
