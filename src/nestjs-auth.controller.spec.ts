import { JwtModule} from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { NestjsAuthController } from './nestjs-auth.controller';
import { NestjsAuthService } from './nestjs-auth.service';
import { UsersService } from './users/users.service';
import * as mock from 'node-mocks-http';

class UsersServiceMock {
  findOne(user,pass) {
    return false
  }
}
describe('NestjsAuthController', () => {
  let controller: NestjsAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'supersecret',
          signOptions: { expiresIn: '2h' }
        })
      ],
      controllers: [NestjsAuthController],
      providers: [
        { 
          provide: UsersService,
          useValue: UsersServiceMock
        },
        NestjsAuthService,
      ]
    }).compile();

    controller = module.get<NestjsAuthController>(NestjsAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login', async () =>  {
    const req = mock.createRequest();
    req.user = {username: 'test'};
    const testResponse = await controller.login(req);
    expect(testResponse.data.access_token).toBeDefined();
  });

});
