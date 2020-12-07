import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
// Services
import { AppService } from './app.service';
// Models
import { Tariff } from './tariff/models';
// Modules
import { TariffModule } from './tariff/tariff.module';
import { bullQueueModule } from './shared/dynamic-modules';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Tariff],
      autoLoadModels: true
    }),
    TariffModule,
    bullQueueModule(`${process.env.REDIS_PREFIX}-tariff`),
  ],
  providers: [AppService],
})
export class AppModule { }
