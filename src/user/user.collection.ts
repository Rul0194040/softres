import { createUserDTO } from './DTO/createUser.dto';
import { ProfileTypes } from './profileTypes.enum';
import { AlmacenGeneralRules } from './rules/almacenGeneral-rules.collection';
import { ComprasRules } from './rules/compras.rules.collection';
import { DirectivosRules } from './rules/directivos.rules.collection';
import { SysAdminRules } from './rules/sysAdmin-rules.collection';
import * as dotenv from 'dotenv';
dotenv.config();

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
    password: process.env.FIRST_PASSWORD,
  },
  {
    firstName: 'Admin',
    lastName: 'Principal',
    email: 'admin@' + domain,
    rules: SysAdminRules.map((r) => r.value),
    profile: ProfileTypes.SYSADMIN,
    password: process.env.FIRST_PASSWORD,
  },
  {
    firstName: 'Almacenista',
    lastName: 'General',
    email: 'almacengeneral@' + domain,
    rules: AlmacenGeneralRules.map((r) => r.value),
    profile: ProfileTypes.ALMACEN_GENERAL,
    password: process.env.FIRST_PASSWORD,
  },
  {
    firstName: 'Compras',
    lastName: 'Encargada',
    email: 'compras@' + domain,
    rules: ComprasRules.map((r) => r.value),
    profile: ProfileTypes.COMPRAS,
    password: process.env.FIRST_PASSWORD,
  },
  {
    firstName: 'Directivos',
    lastName: 'Director Administrativo',
    email: 'directivos@' + domain,
    rules: DirectivosRules.map((r) => r.value),
    profile: ProfileTypes.DIRECTIVO,
    password: process.env.FIRST_PASSWORD,
  },
  {
    firstName: 'Chef en Jefe',
    lastName: 'Encargado de Cocina',
    email: 'directivos@' + domain,
    rules: DirectivosRules.map((r) => r.value),
    profile: ProfileTypes.DIRECTIVO,
    password: process.env.FIRST_PASSWORD,
  },
  {
    firstName: 'Mixologo en Jefe',
    lastName: 'Encargado de Barra',
    email: 'directivos@' + domain,
    rules: DirectivosRules.map((r) => r.value),
    profile: ProfileTypes.DIRECTIVO,
    password: process.env.FIRST_PASSWORD,
  },
];
