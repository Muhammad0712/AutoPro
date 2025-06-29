import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import * as bcrypt from "bcrypt";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud!");
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    return this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  async findAll() {
    const users = await this.userModel.findAll({ include: { all: true } });
    if (!users.length) {
      throw new NotFoundException("Hech qanday foydalanuvchi topilmadi");
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id, { include: { all: true } });
    if (!user) {
      throw new NotFoundException("Bunday foydalanuvchi mavjud emas");
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { password, email } = updateUserDto;
    const user = await this.findByEmail(email!);
    if (user && user.id != id) {
      throw new BadRequestException("Bunday emailli foydalanuvchi mavjud");
    }
    const hashedPassword = await bcrypt.hash(password!, 7);
    const updatedUser = await this.userModel.update(
      { ...updateUserDto, password: hashedPassword },
      { where: { id } }
    );
    return {
      updatedUser,
      message: "User updated succesfully",
    };
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("Bunday foydalanuvchi mavjud emas");
    }
    await this.userModel.destroy({ where: { id } });
    return {
      id: id,
      message: "User deleted succesfully!",
    };
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }

  async updatePassword(id: number, updatedPasswordDto: UpdatePasswordDto) {
    const user = await this.userModel.findByPk(id);
    const { old_password, new_password, confirm_password } = updatedPasswordDto;
    if (!user) {
      throw new NotFoundException("Foydalanuvchi topilmadi");
    }
    const isValidpassword = await bcrypt.compare(old_password, user.password);
    if (!isValidpassword) {
      throw new BadRequestException("Parol xato");
    }
    if (new_password !== confirm_password) {
      throw new BadRequestException("Parollar bir xil emas!");
    }
    const password = await bcrypt.hash(new_password, 7);
    user.password = password;
    await user.save();
    return {
      message: "Password updated succesfully",
    };
  }
}
