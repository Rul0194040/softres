import { Injectable } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { CreateCompraSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { CompraDetalleEntity } from './entities/compraDetalles.entity';
import { CompraSolicitudEntity } from './entities/solicitudCompra.entity';

@Injectable()
export class CompraService {
  create(createCompraDto: CreateCompraDto) {
    const s: CompraDetalleEntity = new CompraDetalleEntity();
    return 'This action adds a new compra';
  }

  findAll() {
    return `This action returns all compra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compra`;
  }

  update(id: number, updateCompraDto: UpdateCompraDto) {
    return `This action updates a #${id} compra`;
  }

  remove(id: number) {
    return `This action removes a #${id} compra`;
  }

  createSolicitud(solicitud: CreateCompraSolicitudDto): CompraSolicitudEntity {
    return null;
  }
}
