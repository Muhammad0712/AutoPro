import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Region } from "./models/region.model";

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(Region) private readonly regionModel: typeof Region
  ) {}
  async create(createRegionDto: CreateRegionDto) {
    const region = await this.regionModel.findOne({
      where: { name: createRegionDto.name },
    });
    if (region) {
      throw new ConflictException("Bunday viloyat mavjud");
    }
    return this.regionModel.create(createRegionDto);
  }

  async findAll() {
    const regions = await this.regionModel.findAll({ include: { all: true } });
    if (!regions.length) {
      throw new NotFoundException("Hech qanday viloyat topilmadi!");
    }
    return regions;
  }

  async findOne(id: number) {
    const region = await this.regionModel.findByPk(id, {
      include: { all: true },
    });
    if (!region) {
      throw new NotFoundException("Bunday viloyat mavjud emas!");
    }
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionModel.findOne({
      where: { name: updateRegionDto.name },
    });
    if (region && region.id != id) {
      throw new ConflictException("Bunday viloyat mavjud!");
    }
    const affectedCount = await this.regionModel.update(updateRegionDto, {
      where: { id },
    });
    if (!affectedCount[0]) {
      throw new NotFoundException("Bunday viloyat mavjud emas!")
    }
    return {
      message: "Viloyat muvaffaqiyatli o'zgartirildi!"
    };
  }

  async remove(id: number) {
    const deletedCound = await this.regionModel.destroy({ where: { id } });
    if (!deletedCound) {
      throw new NotFoundException("Bunday region mavjud emas!")
    }
    return{ 
      message: "Viloyat muvaffaqiyatli o'chirildi!"
    };
  }
}
