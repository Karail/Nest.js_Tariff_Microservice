import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
// Consumers
import { BaseConsumer } from "../../shared/consumers";
// Interfaces
import { JobResult } from "../../shared/interfaces";
import { JobTariffCheck, JobTariffRequest } from "../interfaces";
// Services
import { TariffCheckService, TariffRequestService } from "../services";

// Jobs
export const TARIFF_CHECK = 'tariff-check';
export const TARIFF_REQUEST = 'tariff-request';

@Processor(`${process.env.REDIS_PREFIX}-tariff`)
export class TariffConsumer extends BaseConsumer {

    constructor(
        private readonly tariffCheckService: TariffCheckService,
        private readonly tariffRequestService: TariffRequestService,
    ) {
        super();
    }

    /**
     * tariff-request job
     * @param job
     * @return {JobResult} return standard job response
     */
    @Process({ name: TARIFF_REQUEST, concurrency: 12 })
    private request(job: Job<JobTariffRequest>): Promise<JobResult> {
        return this.tariffRequestService.request(job.data);
    }

    /**
     * tariff-check job
     * @param job
     * @return {JobResult} return standard job response
     */
    @Process({ name: TARIFF_CHECK, concurrency: 12 })
    private check(job: Job<JobTariffCheck>): Promise<JobResult> {
        return this.tariffCheckService.check(job.data);
    }
}