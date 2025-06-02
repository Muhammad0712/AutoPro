import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './models/company.model';
import { Region } from '../regions/models/region.model';
import { Car } from '../cars/models/car.model';
import { Contract } from '../contracts/models/contract.model';

@Module({
  imports: [SequelizeModule.forFeature([Company, Region, Car, Contract])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule {}
