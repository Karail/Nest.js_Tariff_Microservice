// Enums
import { TariffTypeEnum } from "../enums";

export interface TariffInterface {

    userId: string;

    tariffType: TariffTypeEnum;

    tariffId: number;

    countChannels: number;
    
    expiryDate: Date;
}