import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CronExpression } from '@nestjs/schedule';
import { Job, JobOptions, Queue } from 'bull';
// Consumers
import { TARIFF_REQUEST } from './tariff/consumers/tariff.consumer';
// Queues
import { JobTariffRequest } from './tariff/interfaces';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(
    @InjectQueue(`${process.env.REDIS_PREFIX}-tariff`) private readonly tariffQueue: Queue,
  ) { }

  public async onModuleInit(): Promise<void> {
    await this.requestTariff({}, {
      // repeat: {
      //   cron: CronExpression.EVERY_10_MINUTES,
      // },
    });
  }

  /**
   * Add tariff-request job
   * @param {JobTariffRequest} jobParams any object
   * @param {JobOptions} jobOptions job option object
   * @return {void} void
   */
  private async requestTariff(jobParams: JobTariffRequest, jobOptions: JobOptions): Promise<void> {
    try {
      const job: Job<JobTariffRequest> = await this.tariffQueue.add(
        TARIFF_REQUEST,
        jobParams,
        jobOptions
      );
      Logger.log(`Added new job for tariff-request ${job.id}`, 'AppService.requestTariff');
    } catch (e) {
      Logger.error('queue error', e, 'AppService.requestTariff');
    }
  }
}
