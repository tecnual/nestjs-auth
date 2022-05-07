import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NestjsAuthService } from '../../nestjs-auth.service';
import { User } from '../../users/user.schema';

@Injectable()
/**
 * Local strategy
 */
export class LocalStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor
   * @param nestjsAuthService Authentication service
   */
  constructor(
    private nestjsAuthService: NestjsAuthService) {
    super();
  }

  /**
   * Validate user name and password 
   * @param username 
   * @param password 
   * @returns 
   */
  async validate(username: string, password: string): Promise<User> {
    const user = await this.nestjsAuthService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}