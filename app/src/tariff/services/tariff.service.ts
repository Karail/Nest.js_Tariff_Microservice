import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOptions, FindOptions, UpdateOptions } from 'sequelize';
// Interfaces
import { TariffInterface } from '../interfaces';
// Models
import { Tariff } from '../models';

@Injectable()
export class TariffService {

    constructor(
        @InjectModel(Tariff) private readonly tariffModel: typeof Tariff,
    ) { }

    /**
     * find all tariffs
     * @param {FindOptions} options 
     */
    public async findAll(options?: FindOptions): Promise<Tariff[]> {
        return this.tariffModel.findAll(options);
    }

    /**
     * find one tariff
     * @param {FindOptions} options 
     */
    public async findOne(options: FindOptions): Promise<Tariff | null> {
        return this.tariffModel.findOne(options);
    }

    /**
     * create tariff
     * @param {CreateOptions & TariffInterface} options 
     */
    public async create(options: TariffInterface & CreateOptions): Promise<Tariff> {
        return this.tariffModel.create(options);
    }

    /**
     * update tariff
     * @param {any} values 
     * @param {UpdateOptions} options 
     */
    public async update(values: any, options: UpdateOptions): Promise<[number, Tariff[]]> {
        return this.tariffModel.update(values, options);
    }

    /**
     * destroy tariff
     * @param {FindOptions} condition 
     */
    public async delete(condition: FindOptions): Promise<number> {
        return this.tariffModel.destroy(condition);
    }
}