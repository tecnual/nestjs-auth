import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as mock from 'node-mocks-http';

describe('UsersController', () => {
  let controller: UsersController;
  const mockMongooseTokens = [
    {
      provide: getModelToken('User'),
      useValue: {
        findOne: (id) => {
          console.log('Id: ', id)
          return {
            exec: () => {
              return { username: 'UserModelMockTest', _id: id._id };
            }
          }
        }
      }
    }
  ];
  
  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ UsersController ],
      providers: [
        UsersService,
        ...mockMongooseTokens
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getProfile', async () => {
    const req = mock.createRequest();
    req.user = { username: 'test', userId: '1234567' };
    const result = await controller.getProfile(req);
    expect(result.data._id).toBe('1234567');
  });
});
