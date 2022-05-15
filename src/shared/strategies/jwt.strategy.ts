import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { NestjsAuthPayload } from '../../models/nestjs-auth.payload';
import { ConfigService } from '@nestjs/config';


@Injectable()
/**
 * JWTStrategy
 */
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * constructor
   * @param configService 
   */
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWTSecret')
    });
  }

  /**
   * 
   * @param payload 
   * @returns 
   */
  async validate(payload: NestjsAuthPayload): Promise<{userId: string, username: string}> {
    return payload;
  }
}