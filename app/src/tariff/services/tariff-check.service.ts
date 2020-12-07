import { Injectable, Logger } from '@nestjs/common';
// Interfaces
import { JobResult } from 'src/shared/interfaces';
import { JobTariffCheck } from '../interfaces';

@Injectable()
export class TariffCheckService {

    /**
     * tariff check, add warning to the user 
     * @param jobData
     * @return {JobResult} return standard job response
     */
    public async check(jobData: JobTariffCheck): Promise<JobResult> {
        const hrStart = process.hrtime();
        try {
            console.log(jobData);
            return {
                duration: process.hrtime(hrStart),
                message: 'Tariff check',
                error: null
            }
        } catch (e) {
            Logger.error('tariff check error', e, 'TariffCheckService.check');
            return {
                duration: process.hrtime(hrStart),
                error: e.message
            }
        }
    }
    /**
     * send message to user
     */
    private async sendWarning() {

    }
}