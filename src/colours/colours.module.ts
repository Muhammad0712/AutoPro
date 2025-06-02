import { Module } from '@nestjs/common';
import { ColoursService } from './colours.service';
import { ColoursController } from './colours.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Colour } from './models/colour.model';
import { Car } from '../cars/models/car.model';
import { CarColour } from '../car_colours/models/car_colour.model';

@Module({
  imports:[SequelizeModule.forFeature([Colour, Car, CarColour])],
  controllers: [ColoursController],
  providers: [ColoursService],
})
export class ColoursModule {}
