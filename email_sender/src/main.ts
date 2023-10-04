import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(8000);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092'],
          retry: {
            retries: 50,
            initialRetryTime: 1,
            maxRetryTime: 2000,
          },
        },
        consumer: {
          groupId: 'email-consumer',
        },
      },
    },
  );
  app.listen();
}
bootstrap();
