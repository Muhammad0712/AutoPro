import { PartialType } from '@nestjs/swagger';
import { CreateCarModelDto } from './create-car_model.dto';

export class UpdateCarModelDto extends PartialType(CreateCarModelDto) {}
