import { PartialType } from '@nestjs/swagger';
import { CreatePoveedorDTO } from './create-proveedor.dto';
export class UpdateProveedorDTO extends PartialType(CreatePoveedorDTO) {}
