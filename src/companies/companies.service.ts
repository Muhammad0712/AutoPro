import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Company } from "./models/company.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company) private readonly companyModel: typeof Company
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    const user = await this.findByEmail(createCompanyDto.email);
    if (user) {
      throw new BadRequestException("Bunday foydalanuvchi mavjud!");
    }
    const hashedPassword = await bcrypt.hash(createCompanyDto.password, 7);
    return this.companyModel.create({
      ...createCompanyDto,
      password: hashedPassword,
    });
  }

  async findAll() {
    const companies = await this.companyModel.findAll({
      include: { all: true },
    });
    if (!companies.length) {
      throw new NotFoundException("Hech qanday companiya topilmadi");
    }
    return companies;
  }

  async findOne(id: number) {
    const user = await this.companyModel.findByPk(id, {
      include: { all: true },
    });
    if (!user) {
      throw new NotFoundException("Bunday companiya mavjud emas");
    }
    return user;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const { password, email } = updateCompanyDto;
    const company = await this.findByEmail(email!);
    if (company && company.id != id) {
      throw new BadRequestException("Bunday emailli companiya mavjud");
    }
    const hashedPassword = await bcrypt.hash(password!, 7);
    const updatedCompany = await this.companyModel.update(
      { ...updateCompanyDto, password: hashedPassword },
      { where: { id } }
    );
    return {
      updatedCompany,
      message: "Company updated succesfully",
    };
  }

  async remove(id: number) {
    const company = await this.companyModel.findByPk(id);
    if (!company) {
      throw new NotFoundException("Bunday foydalanuvchi mavjud emas");
    }
    await this.companyModel.destroy({ where: { id } });
    return {
      id: id,
      message: "Company deleted succesfully!",
    };
  }

  async findByEmail(email: string) {
    const company = await this.companyModel.findOne({ where: { email } });
    return company;
  }
}
