import { ApiProperty } from '@nestjs/swagger';
import { CotzEstados } from '../cotizacionEstados.enum';

export class DetallesCotizacionDTO {
  @ApiProperty({ nullable: false })
  cotizacionId: number;
  @ApiProperty({ nullable: false })
  insumoId: number;
  @ApiProperty({ nullable: false })
  cantidad: number;
  @ApiProperty({ nullable: false })
  proveedor1Id: number;
  @ApiProperty({ nullable: false })
  precio1: number;
  @ApiProperty({ nullable: true })
  descuento1?: number;
  @ApiProperty({ nullable: false })
  proveedor2Id: number;
  @ApiProperty({ nullable: false })
  precio2: number;
  @ApiProperty({ nullable: true })
  descuento2?: number;
  @ApiProperty({ nullable: false })
  proveedor3Id: number;
  @ApiProperty({ nullable: false })
  precio3: number;
  @ApiProperty({ nullable: true })
  descuento3?: number;
  @ApiProperty({ nullable: false })
  proveedorSeleccionadoId: number;
  @ApiProperty({ nullable: false })
  precioSeleccionado: number;
}

export class CreateCotizacionDTO {
  @ApiProperty({ nullable: true })
  fecha?: Date;
  @ApiProperty({
    nullable: true,
    enum: CotzEstados,
    default: CotzEstados.BORRADOR,
  })
  status?: CotzEstados;
  @ApiProperty({ nullable: true })
  total1?: number;
  @ApiProperty({ nullable: true })
  factura1?: boolean;
  @ApiProperty({ nullable: true })
  formaPago1?: boolean;
  @ApiProperty({ nullable: true })
  total2?: number;
  @ApiProperty({ nullable: true })
  factura2?: boolean;
  @ApiProperty({ nullable: true })
  formaPago2?: boolean;
  @ApiProperty({ nullable: true })
  total3?: number;
  @ApiProperty({ nullable: true })
  factura3?: boolean;
  @ApiProperty({ nullable: true })
  formaPago3?: boolean;
  @ApiProperty({ nullable: false })
  cotizaId: number;
  @ApiProperty({ nullable: true })
  autorizaId: number;
  @ApiProperty({ nullable: false })
  solicitudId: number;
  @ApiProperty({ nullable: true, type: [DetallesCotizacionDTO] })
  detalle?: DetallesCotizacionDTO[];
}
