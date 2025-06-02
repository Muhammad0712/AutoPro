import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarModelDto } from './dto/create-car_model.dto';
import { UpdateCarModelDto } from './dto/update-car_model.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CarModel } from './models/car_model.mode';

@Injectable()
export class CarModelsService {
  constructor(@InjectModel(CarModel) private readonly carModel: typeof CarModel) {}
  async create(createCarModelDto: CreateCarModelDto) {
    const carModel = await this.carModel.findOne({where: {name: createCarModelDto.name}})
    if (carModel) {
      throw new ConflictException("Bunday model tarmoqda mavjud")
    }
    return this.carModel.create(createCarModelDto);
  }

  async findAll() {
    const carModel = await this.carModel.findAll({include: {all: true}})
    if (!carModel.length) {
      throw new NotFoundException("Hech qanday avtomobil modeli topilmadi")
    }
    return carModel;
  }

  async findOne(id: number) {
    const carModel = await this.carModel.findByPk(id, { include: { all: true } });
    if (!carModel) {
      throw new NotFoundException("Bunday avtomobil mavjud emas");
    }
    return carModel;
  }

  async update(id: number, updateCarModelDto: UpdateCarModelDto) {
    const carModel = await this.carModel.findOne({
      where: { name: updateCarModelDto.name },
    });
    if (carModel && carModel.id != id) {
      throw new ConflictException("Bunday model tarmoqda mavjud!");
    }
    const affectedCount = await this.carModel.update(updateCarModelDto, {
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException("Bunday model mavjud emas!");
    }
    return {
      message: "Avtomobil modeli malumoti muvaffaqiyatli o'zgartirildi!",
    };
  }

  async remove(id: number) {
    const carModel = await this.carModel.findByPk(id);
    if (!carModel) {
      throw new NotFoundException("Bunday model mavjud emas!");
    }
    await this.carModel.destroy({ where: { id } });
    return {
      message: "Avtomobil modeli muvaffaqiyatli o'chirildi!",
    };
  }
}
 