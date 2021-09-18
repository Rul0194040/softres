import { ApiProperty } from '@nestjs/swagger';
import { CotzEstados } from '../cotizacionEstados.enum';

export class CreateCotizacionDTO {
  @ApiProperty({ nullable: false })
  usuarioCotizaId: number;
  @ApiProperty({ nullable: false })
  usuarioAutorizaId: number;
  @ApiProperty({ nullable: false })
  solicitudId: number;
  @ApiProperty({ nullable: false })
  folio: string;
  @ApiProperty({ nullable: true })
  fecha?: Date;
  @ApiProperty({ nullable: true })
  status?: CotzEstados;
  @ApiProperty({ nullable: true })
  TotalP1?: number;
  @ApiProperty({ nullable: true })
  facturaP1?: boolean;
  @ApiProperty({ nullable: true })
  formaPagoP1?: boolean;
  @ApiProperty({ nullable: true })
  TotalP2?: number;
  @ApiProperty({ nullable: true })
  facturaP2?: boolean;
  @ApiProperty({ nullable: true })
  formaPagoP2?: boolean;
  @ApiProperty({ nullable: true })
  totalP3?: number;
  @ApiProperty({ nullable: true })
  facturaP3?: boolean;
  @ApiProperty({ nullable: true })
  formaPagoP3?: boolean;
  @ApiProperty({ nullable: true, isArray: true })
  detalles?: DetallesCotizacionDTO[];
}

export class DetallesCotizacionDTO {
  @ApiProperty({ nullable: false })
  cotizacionId: number;
  @ApiProperty({ nullable: false })
  insumoId: number;
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
