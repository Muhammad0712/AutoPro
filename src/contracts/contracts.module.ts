import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Contract } from './models/contract.model';
import { Car } from '../cars/models/car.model';
import { Company } from '../companies/models/company.model';
import { User } from '../users/models/user.model';
import { Payment } from '../payments/models/payment.model';

@Module({
  imports: [SequelizeModule.forFeature([Contract, Car, Company, User, Payment])],
  controllers: [ContractsController],
  providers: [ContractsService],
})
export class ContractsModule {}
