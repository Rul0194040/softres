import { Injectable } from '@nestjs/common';
import { Deptos } from '@softres/almacen/enums/deptos.enum';
import { LoginIdentityDTO } from '@softres/auth/DTOs/loginIdentity.dto';
import { MenuEntity } from '@softres/menu/entitys/menu.entity';
import { RecetaEntity } from '@softres/receta/entities/receta.entity';
import { ProfileTypes } from '@softres/user/profileTypes.enum';
import { getRepository } from 'typeorm';
import { DashboardDTO } from './DTOs/dashboard.dto';

@Injectable()
export class DashboardService {
  /**
   * funcion que retorna los menus y recetas creadas
   * dependiendo del usuario en sesion
   * @param user @type {LoginIdentityDTO} usuario en sesion
   * @returns @type {DashboardDTO} sumas de menu y recetas existentes
   */
  async GetDashboard(user: LoginIdentityDTO): Promise<DashboardDTO> {
    let numRecetas = 0,
      numMenu = 0,
      result: DashboardDTO;

    switch (user.profile) {
      case ProfileTypes.COCINA:
        numRecetas = await getRepository(RecetaEntity)
          .createQueryBuilder('receta')
          .where('receta.depto=:depto', { depto: Deptos.COCINA })
          .getCount();
        numMenu = await getRepository(MenuEntity).count({
          where: { depto: Deptos.COCINA },
        });

        result = {
          recetas: numRecetas,
          menus: numMenu,
        };
        break;
      case ProfileTypes.BARRA:
        numRecetas = await getRepository(RecetaEntity).count({
          where: { depto: Deptos.BARRA },
        });
        numMenu = await getRepository(MenuEntity).count({
          where: { depto: Deptos.BARRA },
        });

        result = {
          recetas: numRecetas,
          menus: numMenu,
        };
        break;

      default:
        break;
    }

    return result;
  }
}
