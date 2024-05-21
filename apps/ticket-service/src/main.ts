import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'ticket',
          brokers: ['localhost:9092'],
          connectionTimeout: 25000,
        },
        consumer: {
          groupId: 'ticket-consumer',
        },
      },
    },
  );
  app.listen();
}
bootstrap();
