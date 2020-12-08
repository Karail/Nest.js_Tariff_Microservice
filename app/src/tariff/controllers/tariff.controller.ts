import { Body, Controller, Delete, Get, Logger, Post, Query } from '@nestjs/common';
// Dto
import { CreateTariffDto, DeleteTariffDto, FindTariffDto } from '../dto';
// Services
import { TariffService } from '../services';

@Controller('tariff')
export class TariffController {

    constructor(
        private readonly tariffService: TariffService,
    ) { }

    @Get()
    private async findAll(
        @Query() findTariffDto: FindTariffDto
    ) {
        try {
            const data = await this.tariffService.findAll({
                where: { ...findTariffDto }
            });
            return data;
        } catch (e) {
            Logger.error('find all error', e, 'TariffController.findAll');
        }
    }

    @Post()
    private async create(
        @Body() createTariffDto: CreateTariffDto
    ) {
        try {
            const data = await this.tariffService.create(createTariffDto);
            return data;
        } catch (e) {
            Logger.error('create error', e, 'TariffController.create');
        }
    }

    @Delete()
    private async delete(
        @Body() { tariffId }: DeleteTariffDto
    ) {
        try {
            const data = await this.tariffService.delete({
                where: {
                    tariffId
                }
            });
            return data;
        } catch (e) {
            Logger.error('delete error', e, 'TariffController.delete');
        }
    }
}