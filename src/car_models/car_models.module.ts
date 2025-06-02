import { Module } from '@nestjs/common';
import { CarModelsService } from './car_models.service';
import { CarModelsController } from './car_models.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarModel } from './models/car_model.mode';
import { Brand } from '../brands/models/brand.model';
import { Car } from '../cars/models/car.model';

@Module({
  imports: [SequelizeModule.forFeature([CarModel, Brand, Car])],
  controllers: [CarModelsController],
  providers: [CarModelsService],
})
export class CarModelsModule {}
