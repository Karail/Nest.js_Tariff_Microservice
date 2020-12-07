import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
// Dto
import { UpsertTariffDto } from '../dto';
// Services
import { TariffService } from '../services';

@Controller('tariff')
export class TariffController {

    constructor(
        private readonly tariffservice: TariffService,
    ) { }

    @Post()
    private async upsert(
        @Body() upsertTariffDto: UpsertTariffDto
    ) {
        try {
            const data = await this.tariffservice.upsert(upsertTariffDto);
            return data;
        } catch (e) {
            Logger.error('queue error', e, 'TariffController.upsert');
        }
    }
}