import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { IJobType } from './app.interface';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('EMAIL_SERVICE') private readonly emailClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.emailClient.subscribeToResponseOf('email-send-op');
  }

  @EventPattern('email-send-op')
  logEmail(data: IJobType) {
    this.appService.processJob(data);
  }
}
