import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Brand } from './models/brand.model';
import { CarModel } from '../car_models/models/car_model.mode';
import { Car } from '../cars/models/car.model';

@Module({
  imports: [SequelizeModule.forFeature([Brand, CarModel, Car])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
