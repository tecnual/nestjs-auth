import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestjsAuthPayload } from '../../models/nestjs-auth.payload';


@Injectable()
/**
 * JWTStrategy
 */
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * constructor
   * @param configService 
   */
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWTSecret')
    });
  }

  /**
   * 
   * @param payload 
   * @returns 
   */
  async validate(payload: NestjsAuthPayload): Promise<{userId: string, username: string}> {
    return { userId: payload.userId, username: payload.username };
  }
}