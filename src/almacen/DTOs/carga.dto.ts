import { MovType } from './../enums/tiposMovimientos.enum';
export class CargaDTO {
  tipo: MovType;
  detalles: CargaDetalleDTO[];
}

export class CargaDetalleDTO {
  insumoId: number;
  cantidad: number;
}
