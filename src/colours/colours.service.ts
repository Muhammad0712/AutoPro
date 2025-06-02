import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { Colour } from "./models/colour.model";
import { CreateColourDto } from "./dto/create-colour.dto";
import { UpdateColourDto } from "./dto/update-colour.dto";

@Injectable()
export class ColoursService {
  constructor(
    @InjectModel(Colour)
    private readonly colourModel: typeof Colour
  ) {}

  async create(createColourDto: CreateColourDto) {
    const exist = await this.colourModel.findOne({
      where: {
        [Op.or]: [
          { name: createColourDto.name },
          { code: createColourDto.code },
        ],
      },
    });

    if (exist) {
      throw new ConflictException(
        "Bunday nom yoki rang kodi allaqachon mavjud!"
      );
    }

    return this.colourModel.create(createColourDto);
  }

  async findAll() {
    const colours = await this.colourModel.findAll({ include: { all: true } });
    if (!colours.length) {
      throw new NotFoundException("Ranglar topilmadi");
    }
    return colours;
  }

  async findOne(id: number) {
    const colour = await this.colourModel.findByPk(id, {
      include: { all: true },
    });
    if (!colour) {
      throw new NotFoundException("Bunday rang topilmadi");
    }
    return colour;
  }

  async update(id: number, updateColourDto: UpdateColourDto) {
    const exist = await this.colourModel.findOne({
      where: {
        [Op.or]: [
          { name: updateColourDto.name },
          { code: updateColourDto.code },
        ],
      },
    });

    if (exist && exist.id !== id) {
      throw new ConflictException(
        "Bunday nom yoki rang kodi allaqachon mavjud!"
      );
    }
    const [updatedRowsCount] = await this.colourModel.update(updateColourDto, {
      where: { id },
    });
    if (!updatedRowsCount) {
      throw new NotFoundException("Yangilash uchun rang topilmadi!");
    }
    return {
      message: "Rang ma'lumotlari muvaffaqiyatli yangilandi!",
    };
  }

  async remove(id: number) {
    const colour = await this.colourModel.findByPk(id);
    if (!colour) {
      throw new NotFoundException("Bunday rang mavjud emas!");
    }
    await this.colourModel.destroy({ where: { id } });
    return {
      message: "Rang muvaffaqiyatli o'chirildi!",
    };
  }
}
