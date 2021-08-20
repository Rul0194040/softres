import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { RateLimit } from 'nestjs-rate-limiter';
import { LoginDTO } from './DTOs/login.dto';
import { LoginResponseDTO } from './DTOs/loginResponse.dto';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   *
   * @tests ['Super Login', 'Admin Login']
   * @param body
   * @param req
   * @returns
   */

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @RateLimit({
    keyPrefix: 'login',
    points: 5,
    duration: 60,
    errorMessage: 'Solo puede intentar 5 veces en 5 minutos máximo.',
  })
  async login(
    @Body() body: LoginDTO,
    @Request() req,
  ): Promise<LoginResponseDTO> {
    return this.authService.login(req.user, body.rememberme);
  }
}
