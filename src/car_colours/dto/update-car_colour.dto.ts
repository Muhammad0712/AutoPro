import { PartialType } from '@nestjs/swagger';
import { CreateCarColourDto } from './create-car_colour.dto';

export class UpdateCarColourDto extends PartialType(CreateCarColourDto) {}
