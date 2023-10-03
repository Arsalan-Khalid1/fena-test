import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'email-microservice',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'email-consumer',
          },
        },
      },
    ]),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
