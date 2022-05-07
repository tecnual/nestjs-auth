import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './models/responses/login.response';
import { User, UserDocument } from './users/user.schema';
import { UsersService } from './users/users.service';

@Injectable()
/**
 * Authentication services
 */
export class NestjsAuthService {
  /**
   * constructor
   * @param usersService 
   * @param jwtService 
   */
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  
  /**
   * Check if there is an specific user in the database
   * @param username 
   * @param pass 
   * @returns 
   */
  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOneByUserAndPassword(username, pass);
    return user ? user : null;
  }

  /**
   * Login:
   *  Obtain access token
   * @param user 
   * @returns 
   */
  async login(user: UserDocument): Promise<LoginResponse> {
    const payload = { username: user.username, userId: user._id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
