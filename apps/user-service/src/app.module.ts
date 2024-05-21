import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as controllers from './presentation/controller/user.controller';
import { UserUseCase } from './domain/usecase/user.usecase';
import { IUserRepository } from './domain/repositories';
import { UserRepository } from './data/repositories';
import { PrismaService } from './data/services';

@Module({
  controllers: [...Object.values(controllers)],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'app-gateway',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'kafka-microservices',
          },
        },
      },
    ]),
  ],
  providers: [
    UserUseCase,
    { provide: IUserRepository, useClass: UserRepository },
    PrismaService,
  ],
  exports: [PrismaService],
})
export class AppModule {}
