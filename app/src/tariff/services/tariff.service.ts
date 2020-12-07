import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOptions, FindOptions, UpsertOptions } from 'sequelize';
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
    public async findOne(options?: FindOptions): Promise<Tariff | null> {
        return this.tariffModel.findOne(options);
    }

    /**
     * create tariff
     * @param {CreateOptions} options 
     */
    public async create(options?: CreateOptions): Promise<Tariff> {
        return this.tariffModel.create(options);
    }

    /**
     * upsert tariff
     * @param {UpsertOptions} options 
     */
    public async upsert(values: any, options?: UpsertOptions & { returning?: false }): Promise<boolean> {
        return this.tariffModel.upsert(values, options);
    }
}
