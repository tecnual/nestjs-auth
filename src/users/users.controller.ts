import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthErrorResponse } from '../models/responses/auth-error.response';
import { NestjsAuthDefaultResponse } from '../models/responses/nestjs-auth-default.response';
import { SubscribeDTO } from '../models/requests/subscribe.dto';
import { UserDocument } from './user.schema';
import { UsersService } from './users.service';
import { Request } from 'express';
import { JWTAuthGuard } from '../shared/guards/jwt-auth.guard';
import { NestjsAuthPayload } from '../models/nestjs-auth.payload';

@Controller('users')
/**
 * Users endpoints controller
 */
export class UsersController {
  /**
   * Constructor
   * @param userService 
   */
  constructor(
    private readonly userService: UsersService
  ) {}

  /**
   * Subsribe
   *  
   * @param subscribeDto 
   * @returns 
   */
  @Post()
  async subscribe(@Res() response, @Body() subscribeDto: SubscribeDTO): Promise<void> {
    let user: UserDocument;
    try {
      user = await this.userService.add(subscribeDto);
      return response.status(HttpStatus.OK).send({ _id: user._id, username: user.username, name: user.name, email: user.email});
    } catch(e) {
      response.status(HttpStatus.CONFLICT).send(new NestjsAuthDefaultResponse(null, null, [new AuthErrorResponse(e.code, e.message)]))
    } 
  }

  /**
   * Obtain authentication user profile
   * @param req 
   */
  @UseGuards(JWTAuthGuard)
  @Get()
  async getProfile(@Req() req: Request): Promise<NestjsAuthDefaultResponse<UserDocument>> {
    const user = req.user as NestjsAuthPayload;
    return new NestjsAuthDefaultResponse(await this.userService.findOneById(user.userId));
  }
}
