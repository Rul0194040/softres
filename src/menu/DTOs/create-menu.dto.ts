import { CreateSeccionDTO } from './create-seccion.dto';

export class CreateMenuDTO {
  nombre: string;
  secciones: CreateSeccionDTO[];
}
