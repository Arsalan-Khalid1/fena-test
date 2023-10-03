import { Injectable, Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IJobType } from './app.interface';
import { randomUUID } from 'crypto';
@Injectable()
export class AppService {
  constructor(
    @Inject('EMAIL_SERVICE') private readonly emailClient: ClientKafka,
  ) {}
  private jobs: Array<IJobType> = [];

  processBulkSend(emailCount: number): IJobType {
    const job: IJobType = {
      id: randomUUID(),
      email: 'mock@email.com',
      emailCount: emailCount,
      processedEmails: 0,
    };
    this.jobs.push(job);
    console.log(emailCount);
    this.emailClient.emit('email-send-op', job);
    return job;
  }

  updateJob(id: string, count: number) {
    const index = this.jobs.findIndex((obj) => obj.id === id);
    this.jobs[index] = { ...this.jobs[index], processedEmails: count };
  }

  getJobs(): Array<IJobType> {
    return this.jobs;
  }

  trackJobProgress(id: string) {
    return this.jobs.find((job) => job.id === id);
  }
}
