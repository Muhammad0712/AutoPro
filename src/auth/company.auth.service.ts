import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { InjectModel } from "@nestjs/sequelize";
import { Company } from "../companies/models/company.model";
import { CompaniesService } from "../companies/companies.service";
import { CreateCompanyDto } from "../companies/dto/create-company.dto";

@Injectable()
export class CompanyAuthService {
  constructor(
    @InjectModel(Company) private readonly companyModel: typeof Company,
    private readonly jwtService: JwtService,
    private readonly companiesService: CompaniesService,
    private readonly mailService: MailService
  ) {}

  async generateTokens(company: Company) {
    const payload = {
      id: company.id,
      email: company.email,
      role: "company",
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(createCompanyDto: CreateCompanyDto) {
    const { email, password } = createCompanyDto;
    const company = await this.companiesService.findByEmail(email);
    if (company) {
      throw new BadRequestException("Bunday email oldin ro'yxatdan o'tgan!");
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const newCompany = await this.companyModel.create({
      ...createCompanyDto,
      password: hashedPassword,
    });
    try {
      await this.mailService.sendMailCompany(newCompany);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }
    return {
      message: "Emailingizni tasdiqlang!",
    };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const company = await this.companiesService.findByEmail(signInDto.email);
    if (!company) {
      throw new NotFoundException("Email yoki parol noto'g'ri!1");
    }
    if (!company.is_active) {
      await this.mailService.sendMailCompany(company);
      throw new BadRequestException("Emailingizga link yuborildi! Tasdiqlab qayta urinib ko'ring!")
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      company.password
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki parol noto'g'ri!2");
    }

    const { accessToken, refreshToken } = await this.generateTokens(company);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    company.refresh_token = await bcrypt.hash(refreshToken, 7);
    await company.save();
    return {
      message: "Tizimga xush kelibsiz!",
      accessToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const companyData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!companyData) {
      throw new ForbiddenException("Company not verified!");
    }
    const company = await this.companiesService.findByEmail(companyData.email);
    if (!company) {
      throw new BadRequestException("Noto'g'ri token!");
    }
    company.refresh_token = "";
    await company.save();
    res.clearCookie("refresh_token");
    return {
      message: "Company logged out succesfully!",
    };
  }

  async refreshToken(id: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    if (id !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan!");
    }
    const company = await this.companyModel.findByPk(id);
    if (!company && !company!.refresh_token) {
      throw new NotFoundException("Company not found");
    }
    const { accessToken, refreshToken } = await this.generateTokens(company!);
    company!.refresh_token = refreshToken;
    await company!.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Company refreshed succesfully",
      companyId: company!.id,
      access_token: accessToken,
    };
  }

  async activateCompany(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found!");
    }
    const affectedCount = await this.companyModel.update(
      { is_active: true },
      { where: { activation_link: link } }
    );
    if (affectedCount[0] === 0) {
      throw new BadRequestException("Company not found!");
    }
    return {
      message: "Company activated succesfully!",
    };
  }
}
