import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockMongooseTokens = [
    {
      provide: getModelToken('User'),
      useValue: {
        find: () => {
          return {
            exec: () => {
              return { username: 'test1' };
            }
          }
        }
      }
    }
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        ...mockMongooseTokens
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    const testResult = await service.findAll('test');
    console.log(testResult);
  });
});
