import { DashboardService } from './dashboard.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginIdentityDTO } from '@softres/auth/DTOs/loginIdentity.dto';
import { JwtAuthGuard } from '@softres/auth/guards/jwt.guard';
import { User } from '@softres/user/DTO/user.decorator';
import { DashboardDTO } from './DTOs/dashboard.dto';

@Controller('dashboard')
@ApiTags('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  /**
   * Retorna los resultados necesarios para mostrar el dashboard
   * de recetas y menus existentes
   * @param user @type {LoginIdentityDTO}
   * @returns @type {DashboardDTO}
   */
  @Get('dashboard')
  GetDash(@User() user: LoginIdentityDTO): Promise<DashboardDTO> {
    return this.dashboardService.GetDashboard(user);
  }
}
