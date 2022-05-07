import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
/**
 * JWT authorization guard
 */
export class JWTAuthGuard extends AuthGuard('jwt') {}