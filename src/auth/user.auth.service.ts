import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/models/user.model";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { MailService } from "../mail/mail.service";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailService: MailService
  ) {}

  async generateTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: "user",
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

  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new BadRequestException("Bunday email oldin ro'yxatdan o'tgan!");
    }
    const hashedPassword = await bcrypt.hash(password, 7);
    const newUser = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
    try {
      await this.mailService.sendMailUser(newUser);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik");
    }
    return {
      message: "Emailingizni tasdiqlang!",
    };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) {
      throw new NotFoundException("Email yoki parol noto'g'ri!1");
    }
    if (!user.is_active) {
      await this.mailService.sendMailUser(user);
      throw new BadRequestException("Emailingizga link yuborildi! Tasdiqlab qayta urinib ko'ring!")
    }
    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.password
    );
    if (!isValidPassword) {
      throw new BadRequestException("Email yoki parol noto'g'ri!2");
    }

    const { accessToken, refreshToken } = await this.generateTokens(user);
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });
    user.refresh_token = await bcrypt.hash(refreshToken, 7);
    await user.save();
    return {
      message: "Tizimga xush kelibsiz!",
      accessToken,
    };
  }

  async signOut(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("User not verified!");
    }
    const user = await this.userService.findByEmail(userData.email);
    if (!user) {
      throw new BadRequestException("Noto'g'ri token!");
    }
    user.refresh_token = "";
    await user.save();
    res.clearCookie("refresh_token");
    return {  
      message: "User logged out succesfully!",
      id: userData.id
    };
  }

  async refreshToken(id: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);
    if (id !== decodedToken["id"]) {
      throw new ForbiddenException("Ruxsat etilmagan!");
    }
    const user = await this.userModel.findByPk(id);
    if (!user && !user!.refresh_token) {
      throw new NotFoundException("User not found");
    }
    const { accessToken, refreshToken } = await this.generateTokens(user!);
    user!.refresh_token = refreshToken;
    await user!.save();

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {
      message: "User refreshed",
      userId: user!.id,
      access_token: accessToken,
    };
  }

  async activateUser(link: string) {
    console.log(link);
    if (!link) {
      throw new BadRequestException("Activation link not found!");
    }
    const affectedCount = await this.userModel.update(
      { is_active: true },
      { where: { activation_link: link } }
    );
    console.log(affectedCount);
    if (affectedCount[0] === 0) {
      throw new BadRequestException("User not found!");
    }
    return {
      message: "User activated succesfully!",
    };
  }
}
