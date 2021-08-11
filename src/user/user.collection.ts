import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '@softres/common/enums/configKeys.enum';
import { createUserDTO } from './DTO/createUser.dto';
import { ProfileTypes } from './profileTypes.enum';
import { AlmacenGeneralRules } from './rules/almacenGeneral-rules.collection';
import { ComprasRules } from './rules/compras.rules.collection';
import { DirectivosRules } from './rules/directivos.rules.collection';
import { SysAdminRules } from './rules/sysAdmin-rules.collection';

const domain = 'xst.mx';
/**
 * usuario unico a crear en el sistema, se crea en app service con password
 * default de .env
 */

export const usersToCreate: createUserDTO[] = [
  {
    firstName: 'Super',
    lastName: 'Admin',
    email: 'super@' + domain,
    profile: ProfileTypes.SUPER,
    password: 'password',
  },
  {
    firstName: 'Admin',
    lastName: 'Principal',
    email: 'admin@' + domain,
    rules: SysAdminRules.map((r) => r.value),
    profile: ProfileTypes.SYSADMIN,
    password: 'password',
  },
  {
    firstName: 'Almacenista',
    lastName: 'General',
    email: 'almacengeneral@' + domain,
    rules: AlmacenGeneralRules.map((r) => r.value),
    profile: ProfileTypes.ALMACEN_GENERAL,
    password: 'password',
  },
  {
    firstName: 'Compras',
    lastName: 'Encargada',
    email: 'compras@' + domain,
    rules: ComprasRules.map((r) => r.value),
    profile: ProfileTypes.COMPRAS,
    password: 'password',
  },
  {
    firstName: 'Directivos',
    lastName: 'Suc Generales',
    email: 'directivos@' + domain,
    rules: DirectivosRules.map((r) => r.value),
    profile: ProfileTypes.DIRECTIVO,
    password: 'password',
  },
];
