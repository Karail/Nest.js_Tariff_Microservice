import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job, JobOptions, Queue } from 'bull';
// Interfaces
import { JobResult } from '../../shared/interfaces';
import { JobTariffCheck, JobTariffRequest } from '../interfaces';
// Queues
import { TARIFF_CHECK } from '../consumers/tariff.consumer';
// Services
import { TariffService } from './tariff.service';

@Injectable()
export class TariffRequestService {

    constructor(
        @InjectQueue(`${process.env.REDIS_PREFIX}-tariff`) private readonly tariffQueue: Queue,
        private readonly tariffservice: TariffService,
    ) { }

    /**
     * tariff request
     * @param jobData
     * @return {JobResult} return standard job response
     */
    public async request(jobData: JobTariffRequest): Promise<JobResult> {
        const hrStart = process.hrtime();
        try {
            const tariffs = await this.tariffservice.findAll();

            for (const tariff of tariffs) {

                this.checkTariff({ tariff }, {});
            }
            return {
                duration: process.hrtime(hrStart),
                message: 'Tariff request',
                error: null
            }
        } catch (e) {
            Logger.error('tariff request error', e, 'TariffRequestService.request');
            return {
                duration: process.hrtime(hrStart),
                error: e.message
            }
        }
    }

    /**
     * Add tariff-check job
     * @param {JobTariffCheck} jobParams any object
     * @param {JobOptions} jobOptions job option object
     * @return {void} void
     */
    private async checkTariff(jobParams: JobTariffCheck, jobOptions: JobOptions): Promise<void> {
        try {
            const job: Job<JobTariffCheck> = await this.tariffQueue.add(
                TARIFF_CHECK,
                jobParams,
                jobOptions
            );
            Logger.log(`Added new job for tariff-check ${job.id}`, 'TariffRequestService.checkTariff');
        } catch (e) {
            Logger.error('queue error', e, 'TariffRequestService.checkTariff');
        }
    }
}