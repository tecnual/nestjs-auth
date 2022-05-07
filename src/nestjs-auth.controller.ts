import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalAuthGuard } from './shared/guards/local-auth.guard';
import { NestjsAuthDefaultResponse } from './models/responses/nestjs-auth-default.response';
import { LoginResponse } from './models/responses/login.response';
import { NestjsAuthService } from './nestjs-auth.service';
import { UserDocument } from './users/user.schema';

@Controller('auth')
/**
 * Authentication controller
 */
export class NestjsAuthController {
  /**
   * Constructor
   * @param authService
   */
  constructor(private readonly authService: NestjsAuthService) {}

  /**
   * Login
   * @param req
   * @returns
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<NestjsAuthDefaultResponse<LoginResponse>> {
    const access_token = await this.authService.login(req.user as UserDocument);
    return new NestjsAuthDefaultResponse<LoginResponse>(access_token);
  }
}
