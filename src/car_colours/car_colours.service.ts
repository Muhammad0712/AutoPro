import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateCarColourDto } from "./dto/create-car_colour.dto";
import { CarColour } from "./models/car_colour.model";
import { UpdateCarColourDto } from "./dto/update-car_colour.dto";
import { Car } from "../cars/models/car.model";

@Injectable()
export class CarColoursService {
  constructor(
    @InjectModel(CarColour) private readonly carColoursModel: typeof CarColour
  ) {}

  async create(createCarColourdto: CreateCarColourDto) {
    const existing = await this.carColoursModel.findOne({
      where: {
        car_id: createCarColourdto.car_id,
        colour_id: createCarColourdto.colour_id,
      },
    });
    if (existing) {
      throw new ConflictException(
        "Ushbu avtomobilni bunday rangi allaqachon mavjud"
      );
    }
    return this.carColoursModel.create(createCarColourdto);
  }

  async findAll() {
    const records = await this.carColoursModel.findAll();
    if (!records.length) {
      throw new NotFoundException("Bu avtomobilni bunday rangi mavjud emas");
    }
    return records;
  }

  async findOne(id: number) {
    const record = await this.carColoursModel.findByPk(id);
    if (!record) {
      throw new NotFoundException("Bu avtomobilni bunday rangi mavjud emas");
    }
    return record;
  }

  async update(id: number, updateCarColourDto: UpdateCarColourDto) {
    const record = await this.carColoursModel.findByPk(id);
    if (!record) {
      throw new NotFoundException("Bu avtomobilni bunday rangi mavjud emas");
    }

    const conflict = await this.carColoursModel.findOne({
      where: {
        car_id: updateCarColourDto.car_id,
        colour_id: updateCarColourDto.colour_id,
      },
    });
    if (conflict && conflict.id !== id) {
      throw new ConflictException("Ushbu bog‘lanish allaqachon mavjud");
    }

    await this.carColoursModel.update(updateCarColourDto, { where: { id } });

    return { message: "Bog‘lanish muvaffaqiyatli yangilandi" };
  }

  async remove(id: number) {
    const record = await this.carColoursModel.findByPk(id);
    if (!record) {
      throw new NotFoundException("Bu avtomobilni bunday rangi topilmadi");
    }
    await this.carColoursModel.destroy({ where: { id } });
    return { message: "Bog‘lanish muvaffaqiyatli o‘chirildi" };
  }

  async getCompanyCarColours(id: number) {
    const carColour = await this.carColoursModel.findAll({
      where: {
        car_id: id,
      },
      include: {
        all: true,
      },
    });
    if (!carColour.length) {
      throw new NotFoundException("Bu avtomobilni bunday rangi mavjud emas!");
    }
    return carColour;
  }
}
