import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
// Enums
import { TariffTypeEnum } from "../enums";

export class UpsertTariffDto {

    userId!: string;

    tariffType!: TariffTypeEnum;
    
    expiryDate!: Date;
}