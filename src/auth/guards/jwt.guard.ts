import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/**
 * @ignore algo
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
