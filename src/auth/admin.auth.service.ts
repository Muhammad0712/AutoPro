import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { InjectModel } from "@nestjs/sequelize";
import { Admin } from "../admins/models/admin.model";
import { AdminsService } from "../admins/admins.service";

@Injectable()
export class AdminAuthService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminsService
  ) {}

  async generateTokens(admin: Admin) {
    const creatorEmails = process.env.CREATOR_EMAILS!.split(" ")
    const isSuperAdmin = creatorEmails.includes(admin.email);
    console.log(isSuperAdmin);
    admin.is_creator = isSuperAdmin;
    await admin.save();
    const role = isSuperAdmin ? "superadmin" : "admin";

    const payload = {
      id: admin.id,
      email: admin.email,
      role: role,
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

  async signIn(signInDto: SignInDto, res: Response) {
    const admin = await this.adminService.findByEmail(signInDto.email);
    if (!admin) {
      throw new NotFoundException("Email yoki parol noto'g'ri!1");
    }
    if (!admin.is_active) {
      throw new BadRequestException(
        "Emailingizga link yuborildi! Tasdiqlab qayta urinib ko'ring!"
      );
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      admin.password
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki parol noto'g'ri!2");
    }

    const { accessToken, refreshToken } = await this.generateTokens(admin);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    admin.refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin.save();
    return {
      message: "Tizimga xush kelibsiz!",
      accessToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException("User not verified!");
    }
    const admin = await this.adminService.findByEmail(adminData.email);
    if (!admin) {
      throw new BadRequestException("Noto'g'ri token!");
    }
    admin.refresh_token = "";
    await admin.save();
    res.clearCookie("refresh_token");
    return {
      message: "Admin logged out succesfully!",
      id: adminData.id
    };
  }

  async refreshToken(id: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    if (id !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan!");
    }
    const admin = await this.adminModel.findByPk(id);
    if (!admin && !admin!.refresh_token) {
      throw new NotFoundException("Admin not found");
    }
    const { accessToken, refreshToken } = await this.generateTokens(admin!);
    admin!.refresh_token = await bcrypt.hash(refreshToken, 7);
    await admin!.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "Admin refreshed",
      userId: admin!.id,
      access_token: accessToken,
    };
  }
}
