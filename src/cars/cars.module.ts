import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './models/car.model';
import { Brand } from '../brands/models/brand.model';
import { CarModel } from '../car_models/models/car_model.mode';
import { Company } from '../companies/models/company.model';
import { Colour } from '../colours/models/colour.model';
import { CarColour } from '../car_colours/models/car_colour.model';
import { Contract } from '../contracts/models/contract.model';

@Module({
  imports: [SequelizeModule.forFeature([Car, CarModel, Brand, Company, Colour, CarColour, Contract])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
