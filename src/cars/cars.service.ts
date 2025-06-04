import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Car } from "./models/car.model";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car) private readonly carModel: typeof Car) {}

  async create(createCarDto: CreateCarDto) {
    const candidate = await this.carModel.findOne({
      where: {
        model_id: createCarDto.model_id,
        brand_id: createCarDto.brand_id,
        car_year: createCarDto.car_year,
      },
    });

    if (candidate) {
      throw new ConflictException("Bunday avtomobil allaqachon mavjud");
    }

    return this.carModel.create(createCarDto);
  }

  async findAll() {
    const cars = await this.carModel.findAll({ include: { all: true } });
    if (!cars.length) {
      throw new NotFoundException("Avtomobillar topilmadi");
    }
    return cars;
  }

  async findOne(id: number) {
    const car = await this.carModel.findByPk(id, { include: { all: true } });
    if (!car) {
      throw new NotFoundException("Bunday avtomobil mavjud emas");
    }
    return car;
  }

  async update(id: number, updateCarDto: UpdateCarDto) {
    const existing = await this.carModel.findOne({
      where: {
        model_id: updateCarDto.model_id,
        brand_id: updateCarDto.brand_id,
        car_year: updateCarDto.car_year,
      },
    });

    if (existing && existing.id !== id) {
      throw new ConflictException("Shu modeldagi avtomobil allaqachon mavjud");
    }

    const [updatedCount] = await this.carModel.update(updateCarDto, {
      where: { id },
    });

    if (!updatedCount) {
      throw new NotFoundException("Yangilash uchun avtomobil topilmadi");
    }

    return { message: "Avtomobil ma'lumotlari muvaffaqiyatli yangilandi!" };
  }

  async remove(id: number) {
    const car = await this.carModel.findByPk(id);
    if (!car) {
      throw new NotFoundException("O'chirish uchun avtomobil topilmadi");
    }

    await this.carModel.destroy({ where: { id } });

    return { message: "Avtomobil muvaffaqiyatli o'chirildi!" };
  }

  async getCompanyCars(id: number) {
    const cars = await this.carModel.findAll({
      where: {
        company_id: id,
      },
    });
    if (!cars.length) {
      throw new NotFoundException("Hech qanday avtomobil topilmadi!");
    }
    return cars;
  }
}
