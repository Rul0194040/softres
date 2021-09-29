import { CreateSolicitudDTO } from './dto/create-solicitud.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompraService } from './compra.service';
import { PaginationOptions } from '@softres/common/DTOs/paginationOptions.dto';
import { PaginationPrimeNgResult } from '@softres/common/DTOs/paginationPrimeNgResult.dto';
import { User } from '@softres/user/DTO/user.decorator';
import { LoginIdentityDTO } from '@softres/auth/DTOs/loginIdentity.dto';
import { JwtAuthGuard } from '@softres/auth/guards/jwt.guard';
import { UpdateResult } from 'typeorm';

@Controller('solicitud')
@ApiTags('Solicitud')
@UseGuards(JwtAuthGuard)
export class SolicitudController {
  constructor(private readonly compraService: CompraService) {}

  @Post()
  create(
    @Body() solicitud: CreateSolicitudDTO,
    @User() user: LoginIdentityDTO,
  ) {
    return this.compraService.createSolicitud(solicitud, user);
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.compraService.getSolicitudById(id);
  }

  @Post('paginate')
  paginate(
    @Body() options: PaginationOptions,
    @User() user: LoginIdentityDTO,
  ): Promise<PaginationPrimeNgResult> {
    return this.compraService.paginate(options, user);
  }

  @Put('abastecer/:idSolicitud')
  @ApiOperation({
    description: 'NO SIRVE AÚN',
  })
  abastecerAlmacenes(
    @Param('idSolicitud') idSolicitud: number,
  ): Promise<UpdateResult> {
    return this.compraService.abastecerAlmacenes(idSolicitud);
  }
}
