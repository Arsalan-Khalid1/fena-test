import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
    }),
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
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
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
