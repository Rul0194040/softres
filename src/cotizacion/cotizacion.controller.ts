import { CotizacionService } from './cotizacion.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCotizacionDTO } from './DTOs/create-cotizacion.dto';
import { JwtAuthGuard } from '@softres/auth/guards/jwt.guard';
import { LoginIdentityDTO } from '@softres/auth/DTOs/loginIdentity.dto';
import { User } from '@softres/user/DTO/user.decorator';
import { InformeCotizacion } from './DTOs/create-informe-cotz.dto';
import { UpdateResult } from 'typeorm';
import { UpdateCotizacionDTO } from './DTOs/update-cotizacion.dto';

@Controller('cotizacion')
@ApiTags('Cotización')
@UseGuards(JwtAuthGuard)
export class CotizacionController {
  constructor(private readonly cotizacionService: CotizacionService) {}

  @Post()
  create(
    @Body() cotizacion: CreateCotizacionDTO,
    @User() user: LoginIdentityDTO,
  ): Promise<InformeCotizacion> {
    return this.cotizacionService.create(cotizacion, user);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.cotizacionService.getById(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() cotizacion: UpdateCotizacionDTO,
  ): Promise<UpdateResult> {
    return this.cotizacionService.update(id, cotizacion);
  }
}
