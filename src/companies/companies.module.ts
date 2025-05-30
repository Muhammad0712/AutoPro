import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from './models/company.model';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
  exports: [CompaniesService]
})
export class CompaniesModule {}
