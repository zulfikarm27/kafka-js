import { NestFactory } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('onModuleInit should connect to the DB', () => {
    jest.spyOn(service, '$connect');

    service.onModuleInit();

    expect(service.$connect).toBeCalled();
  });

  //   it('enableShutdownHooks should close app', async () => {
  //     const app = await NestFactory.create(AppModule);

  //     app.close = jest.fn().mockImplementation(async () => {
  //       console.log(true);
  //     });

  //     jest.spyOn(app, 'close').mockImplementation(async () => {
  //       console.log(true);
  //     });

  //     await service.enableShutdownHooks(app);

  //     expect(app.close).toBeCalled();
  //   });
});
