import { Injectable, Logger } from '@nestjs/common';
import fetch from 'node-fetch';
// Interfaces
import { JobResult } from '../../shared/interfaces';
import { JobTariffCheck } from '../interfaces';
// Services
import { TariffService } from './tariff.service';

@Injectable()
export class TariffCheckService {

    constructor(
        private readonly tariffService: TariffService,
    ) { }

    /**
     * tariff check, add warning to the user 
     * @param jobData
     * @return {JobResult} return standard job response
     */
    public async check(jobData: JobTariffCheck): Promise<JobResult> {
        const hrStart = process.hrtime();
        try {
            const { tariff } = jobData;

            const date = new Date();

            const expiryDate = new Date(tariff.expiryDate);

            expiryDate.setDate(expiryDate.getDate() - 5);

            if (expiryDate <= date) {
                // Tariff expires in five days
                this.sendWarning({
                    tariff,
                    msg: 'Tariff expires in five days'
                });
            }
            else if (tariff.expiryDate <= date) {
                // The tariff has expired
                const data = await this.needToExtend(tariff);

                if (data) {
                    const { needToExtend } = data;
                    const newExpiryDate = new Date(tariff.expiryDate);
                    newExpiryDate.setDate(newExpiryDate.getDate() + needToExtend);

                    this.tariffService.update(
                        { expiryDate: newExpiryDate },
                        { where: { tatiffId: tariff.tariffId } })
                }
            }

            console.log(tariff);

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
     * @param {any} msg
     */
    private async sendWarning(msg: any) {
        fetch('', {
            body: JSON.stringify(msg)
        });
    }
    /**
     * need to extend
     * @param {any} msg
     */
    private async needToExtend(body: any): Promise<{ needToExtend: number } | undefined> {
        try {
            const response = await fetch('', {
                body: JSON.stringify(body)
            });
            const data = await response.json();
            return data;
        } catch (e) {
            Logger.error('need to extend error', e, 'TariffCheckService.needToExtend');
        }
    }
}