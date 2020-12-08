// Enums
import { TariffTypeEnum } from "../enums";

export class CreateTariffDto {

    userId!: string;

    tariffType!: TariffTypeEnum;

    tariffId!: number;

    countChannels!: number;
    
    expiryDate!: Date;
}