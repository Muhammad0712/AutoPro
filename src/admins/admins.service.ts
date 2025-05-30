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
    const admin = await this.findByEmail(createAdminDto.email);
    if (admin) {
      throw new BadRequestException("Bunday admin mavjud!");
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
    if (admin && admin.id != id) {
      throw new BadRequestException(
        "Bunday email tarmoqda mavjud"
      );
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
      throw new NotFoundException("Bunday admin mavjud emas");
    }
    await this.adminModel.destroy({ where: { id } });
    return {
      id: id,
      message: "Admin deleted succesfully!",
    };
  }

  async activateAdmin(id: number, is_active: boolean) {
    const admin = await this.adminModel.findByPk(id);
    if (!admin) {
      throw new BadRequestException("Admin not found!");
    }
    await this.adminModel.update({ is_active }, { where: { id } });
    if (is_active) {
      return {
        message: "Admin activated succesfully!",
      };
    } 
    return {
      message: "Admin has been deactivated!!",
    };
  }

  async findByEmail(email: string) {
    const admin = await this.adminModel.findOne({ where: { email } });
    return admin;
  }
}
