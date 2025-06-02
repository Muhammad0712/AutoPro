import { Module } from '@nestjs/common';
import { CarColoursService } from './car_colours.service';
import { CarColoursController } from './car_colours.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarColour } from './models/car_colour.model';
import { Car } from '../cars/models/car.model';
import { Colour } from '../colours/models/colour.model';

@Module({
  imports: [SequelizeModule.forFeature([CarColour, Car, Colour])],
  controllers: [CarColoursController],
  providers: [CarColoursService],
})
export class CarColoursModule {}
