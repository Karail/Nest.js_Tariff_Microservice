// Enums
import { TariffTypeEnum } from "../enums";

export class FindTariffDto {

    userId!: string;

    tariffType!: TariffTypeEnum;

    tariffId!: number;

    countChannels!: number;
    
    expiryDate!: Date;
}