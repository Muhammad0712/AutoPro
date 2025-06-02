import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { Contract } from '../contracts/models/contract.model';

@Module({
  imports: [SequelizeModule.forFeature([Payment, Contract])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
