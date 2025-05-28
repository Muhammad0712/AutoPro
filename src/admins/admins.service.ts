import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "./models/admin.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminsService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}
  async create(createAdminDto: CreateAdminDto) {
    const user = await this.findByEmail(createAdminDto.email);
    if (user) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud!");
    }
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    return this.adminModel.create({
      ...createAdminDto,
      password: hashedPassword,
    });
  }

  async findAll() {
    const admin = await this.adminModel.findAll({ include: { all: true } });
    if (!admin.length) {
      throw new NotFoundException("Hech qanday admin topilmadi");
    }
    return admin;
  }

  async findOne(id: number) {
    const admin = await this.adminModel.findByPk(id, {
      include: { all: true },
    });
    if (!admin) {
      throw new NotFoundException("Bunday admin mavjud emas");
    }
    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const { password, email } = updateAdminDto;
    const admin = await this.findByEmail(email!);
    if (admin) {
      throw new BadRequestException("Bunday emailli admin mavjud");
    }
    const hashedPassword = await bcrypt.hash(password!, 7);
    const updatedAdmin = await this.adminModel.update(
      { ...updateAdminDto, password: hashedPassword },
      { where: { id } }
    );
    return {
      updatedAdmin,
      message: "Admin updated succesfully",
    };
  }

  async remove(id: number) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new NotFoundException("Bunday admin mavjud emas") 
    }
    await this.adminModel.destroy({ where: { id } });
    return {
      id: id,
      message: "Admin deleted succesfully!",
    };
  }

  async findByEmail(email: string) {
    const admin = await this.adminModel.findOne({ where: { email } });
    return admin;
  }
}
