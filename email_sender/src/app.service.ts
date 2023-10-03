import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IJobType } from './app.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject('EMAIL_SERVICE') private readonly emailClient: ClientKafka,
  ) {}

  processJob(data: IJobType) {
    this.sendEmail(data);
  }

  async sendEmail(data: IJobType) {
    for (let index = 1; index <= data.emailCount; index++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          const updatedJob = {
            id: data.id,
            count: index,
          };
          this.emailClient.emit('email-send-op-completed', updatedJob);
          resolve(index);
        }, 1000);
      });
    }
  }
}
