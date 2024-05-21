import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as controllers from './presentation/controller/ticket.controller';
import { TicketUseCase } from './domain/usecase/ticket.usecase';
import { ITicketRepository } from './domain/repositories';
import { TicketRepository } from './data/repositories';
import { PrismaService } from './data/services';

@Module({
  controllers: [...Object.values(controllers)],
  imports: [
    ClientsModule.register([
      {
        name: 'TICKET_SERVICE',
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
    TicketUseCase,
    { provide: ITicketRepository, useClass: TicketRepository },
    PrismaService,
  ],
  exports: [PrismaService],
})
export class AppModule {}
