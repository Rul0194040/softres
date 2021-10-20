import { TiposMov } from './../enums/tiposMovimientos.enum';
export class CargaDTO {
  tipo: TiposMov;
  detalle: CargaDetalleDTO[];
}

export class CargaDetalleDTO {
  insumoId: number;
  cantidad: number;
}
