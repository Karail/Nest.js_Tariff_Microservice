import { Column, DataType, Model, Table } from 'sequelize-typescript';
// Enums
import { TariffTypeEnum } from '../enums';

@Table({
  timestamps: true,
  tableName: 'tariff'
})
export class Tariff extends Model<Tariff> {

  @Column(DataType.STRING)
  userId!: string;

  @Column(DataType.INTEGER)
  tariffType!: TariffTypeEnum;

  @Column(DataType.INTEGER)
  tariffId!: number;

  @Column(DataType.INTEGER)
  countChannels!: number;

  @Column(DataType.DATE)
  expiryDate!: Date;

}