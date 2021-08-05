import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@softres/user/user.module';
import { AuthService } from './auth.service';
import { jwtSecret } from './constants';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
