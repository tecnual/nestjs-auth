import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
/**
 * Local authorization guard
 */
export class LocalAuthGuard extends AuthGuard('local') {}