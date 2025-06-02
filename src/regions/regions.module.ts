import { Module } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { RegionsController } from './regions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './models/region.model';
import { Company } from '../companies/models/company.model';

@Module({
  imports: [SequelizeModule.forFeature([Region, Company])],
  controllers: [RegionsController],
  providers: [RegionsService],
})
export class RegionsModule {}
