import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Brand } from "./models/brand.model";

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand) private readonly brandModel: typeof Brand) {}
  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.brandModel.findOne({where: {name: createBrandDto.name}});
    if (brand) {
      throw new ConflictException("Bunday brand tarmoqda mavjud!");
    }
    return this.brandModel.create(createBrandDto);
  }

  async findAll() {
    const brands = await this.brandModel.findAll({ include: { all: true } });
    if (!brands.length) {
      throw new NotFoundException("Hech qanday brand topilmadi!");
    }
    return brands;
  }

  async findOne(id: number) {
    const brand = await this.brandModel.findByPk(id, {
      include: { all: true },
    });
    if (!brand) {
      throw new NotFoundException("Bunday brand mavjud emas")
    }
    return brand;
  }

  async update(id: number, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandModel.findOne({where: {name: updateBrandDto.name}})
    if (brand && brand.id != id) {
      throw new ConflictException("Bunday brand tarmoqda mavjud!")
    }
    const affectedCount = await this.brandModel.update(updateBrandDto, {
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException("Bunday brand mavjud emas!")
    }
    return {
      message: "Brand malumoti muvaffaqiyatli o'zgartirildi!"
    };
  }

  async remove(id: number) {
    const brand = await this.brandModel.findByPk(id);
    if (!brand) {
      throw new NotFoundException("Bunday brand mavjud emas!")
    }
    await this.brandModel.destroy({ where: { id } });
    return {
      message: "Brand muvaffaqiyatli o'chirildi!"
    };
  }
}
