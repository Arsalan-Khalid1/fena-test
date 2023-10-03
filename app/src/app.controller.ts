import {
  Body,
  Controller,
  Get,
  Post,
  OnModuleInit,
  Inject,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { IJobUpdate } from './app.interface';
@Controller('job')
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('EMAIL_SERVICE') private readonly emailClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.emailClient.subscribeToResponseOf('email-send-op-completed');
  }

  @EventPattern('email-send-op-completed')
  loggingCompleted(data: IJobUpdate) {
    this.appService.updateJob(data.id, data.count);
  }

  @Post()
  postJobs(@Body() body: any) {
    const { emailCount } = body;
    const job = this.appService.processBulkSend(emailCount);
    const response = {
      job,
    };
    return response;
  }

  @Get()
  getJobs(): any {
    const jobs = this.appService.getJobs();
    return jobs;
  }

  @Get('track/:jobId')
  trackJob(@Param('jobId') jobId: string): any {
    const job = this.appService.trackJobProgress(jobId);
    return job;
  }
}
