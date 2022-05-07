import { JwtModule } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { NestjsAuthService } from './nestjs-auth.service';
import { UsersService } from './users/users.service';

describe('NestjsAuthService', () => {
  let service: NestjsAuthService;
  const mockMongooseTokens = [
    {
      provide: getModelToken('User'),
      useValue: {}
    }
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'testsecret',
          signOptions: { expiresIn: '2h' }
        })
      ],
      providers: [
        NestjsAuthService,
        UsersService,
        ...mockMongooseTokens
      ]
    }).compile();

    service = module.get<NestjsAuthService>(NestjsAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
