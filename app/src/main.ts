import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'app-gateway',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'email-producer',
      },
    },
  });

  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
