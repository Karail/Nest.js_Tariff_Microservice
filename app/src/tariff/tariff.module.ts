import { Module } from '@nestjs/common';
// Services
import { TariffCheckService, TariffRequestService, TariffService } from './services';
// Controllers
import { TariffController } from './controllers';
// Consumers
import { TariffConsumer } from './consumers';
import { SequelizeModule } from '@nestjs/sequelize';
// Models
import { Tariff } from './models';
// Modules
import { bullQueueModule } from 'src/shared/dynamic-modules';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Tariff
    ]),
    bullQueueModule(`${process.env.REDIS_PREFIX}-tariff`),
  ],
  providers: [
    TariffService, 
    TariffCheckService, 
    TariffRequestService,
    // Consumers
    TariffConsumer
  ],
  controllers: [TariffController]
})
export class TariffModule {}
