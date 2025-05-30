import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { UserAuthService } from "./user.auth.service";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { Response } from "express";
import { CookieGetter } from "../common/decorators/cookie-getter.decorator";
import { AdminAuthService } from "./admin.auth.service";
import { CreateCompanyDto } from "../companies/dto/create-company.dto";
import { CompanyAuthService } from "./company.auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly adminAuthService: AdminAuthService,
    private readonly companyAuthService: CompanyAuthService
  ) {}

  //  ///////////////////////////////////////    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // ||||||||||||||||||||||||||||||||||||||| USER |||||||||||||||||||||||||||||||||||||||
  //  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\    ///////////////////////////////////////

  //____________________-SIGN-UP-____________________
  @ApiOperation({
    summary: "Yangi foydalanuvchini ro'yxatdan o'tkazish",
    description:
      "Foydalanuvchini ro'yxatdan o'tkazish va aktivatsiya linkini yuborish",
  })
  @ApiBody({
    type: CreateUserDto,
    description: "Ro'yxatdan o'tish uchun foydalanuvchi ma'lumotlari",
  })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi",
  })
  @ApiResponse({
    status: 400,
    description:
      "Foydalanuvchi oldin ro'yxatdan o'tgan yoki malumot kiritishda xatolik!",
  })
  @HttpCode(201)
  @Post("users/sign-up")
  async signUpUser(@Body() createUserDto: CreateUserDto) {
    return this.userAuthService.signUp(createUserDto);
  }

  //____________________-SIGN-IN-____________________
  @ApiOperation({
    summary: "Foydalanuvchi tizimga kirishi",
    description: "Email va parol orqali tizimga kirish va access token olish.",
  })
  @ApiBody({
    type: SignInDto,
    description: "Tizimga kirish uchun email va parol",
  })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli tizimga kirildi va access token qaytarildi",
  })
  @ApiResponse({
    status: 400,
    description: "Email yoki parol noto'g'ri",
  })
  @ApiResponse({
    status: 401,
    description: "Tizimga kirish uchun avtorizatsiya talab qilinadi",
  })
  @HttpCode(200)
  @Post("users/sign-in")
  async signInUser(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.userAuthService.signIn(signInDto, res);
  }

  //____________________-SIGN-OUT-____________________
  @ApiOperation({
    summary: "Foydalanuvchi tizimdan chiqishi",
    description:
      "Refresh token orqali bemorni tizimdan chiqarish va cookie'ni tozalash.",
  })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli tizimdan chiqdingiz",
  })
  @ApiResponse({
    status: 400,
    description: "refresh token mavjud emas",
  })
  @HttpCode(200)
  @Post("users/sign-out")
  signOutUser(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.userAuthService.signOut(refreshToken, res);
  }

  //____________________-ACTIVATE-USER-____________________
  @ApiOperation({
    summary: "Foydalanuvchini faollashtirish",
    description:
      "Bu endpoint foydalanuvchi hisobini faollashtirish uchun yagona aktivatsiya linkidan foydalaniladi.",
  })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi hisobi muvaffaqiyatli faollashtirildi.",
  })
  @ApiResponse({
    status: 400,
    description: "Link topilmadi",
  })
  @Get("users/activate/:link")
  activateUser(@Param("link") link: string) {
    return this.userAuthService.activateUser(link);
  }

  //____________________-REFRESH-USER-____________________
  @ApiOperation({
    summary: "Foydalanuvchining refresh tokenini yangilash",
    description:
      "Berilgan ID bo‘yicha refresh tokenni yangilaydi va yangi access token qaytariladi.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Foydalanuvchini unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Access token muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 400,
    description: "Refresh token noto‘g‘ri yoki foydalanuvchi topilmadi",
  })
  @ApiResponse({
    status: 401,
    description: "Refresh token mavjud emas",
  })
  @HttpCode(200)
  @Post("users/:id/refresh")
  refreshUser(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.userAuthService.refreshToken(id, refreshToken, res);
  }

  //  ///////////////////////////////////////     \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // ||||||||||||||||||||||||||||||||||||||| ADMIN |||||||||||||||||||||||||||||||||||||||
  //  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\     ///////////////////////////////////////

  //____________________-SIGN-IN-____________________
  @ApiOperation({
    summary: "Admin tizimga kirishi",
    description: "Email va parol orqali tizimga kirish va access token olish.",
  })
  @ApiBody({
    type: SignInDto,
    description: "Tizimga kirish uchun email va parol",
  })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli tizimga kirildi va access token qaytarildi",
  })
  @ApiResponse({
    status: 400,
    description: "Email yoki parol noto'g'ri",
  })
  @ApiResponse({
    status: 401,
    description: "Tizimga kirish uchun avtorizatsiya talab qilinadi",
  })
  @HttpCode(200)
  @Post("admins/sign-in")
  async signInAdmin(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.signIn(signInDto, res);
  }

  //____________________-SIGN-OUT-____________________
  @ApiOperation({
    summary: "Admin tizimdan chiqishi",
    description:
      "Refresh token orqali admin tizimdan chiqadi. Malumotlar bazasida refreshToken va cookie tozalanadi",
  })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli tizimdan chiqdingiz",
  })
  @ApiResponse({
    status: 400,
    description: "Refresh token mavjud emas",
  })
  @HttpCode(200)
  @Post("admins/sign-out")
  signOutAdmin(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.signOut(refreshToken, res);
  }

  //____________________-REFRESH-USER-____________________
  @ApiOperation({
    summary: "Admin refresh tokenini yangilash",
    description:
      "Berilgan ID bo‘yicha refresh tokenni yangilaydi va yangi access token qaytariladi.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Admin unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Access token muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 400,
    description: "Refresh token noto‘g‘ri yoki foydalanuvchi topilmadi",
  })
  @ApiResponse({
    status: 401,
    description: "Refresh token mavjud emas",
  })
  @HttpCode(200)
  @Post("admins/:id/refresh")
  refreshAdmin(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.refreshToken(id, refreshToken, res);
  }

  //  ///////////////////////////////////////       \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  // ||||||||||||||||||||||||||||||||||||||| COMPANY |||||||||||||||||||||||||||||||||||||||
  //  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\       ///////////////////////////////////////

  //____________________-SIGN-UP-____________________
  @ApiOperation({
    summary: "Yangi kompaniyani ro'yxatdan o'tkazish",
    description:
      "Kompaniyani ro'yxatdan o'tkazish va aktivatsiya linkini yuborish",
  })
  @ApiBody({
    type: CreateCompanyDto,
    description: "Ro'yxatdan o'tish uchun kompaniya ma'lumotlari",
  })
  @ApiResponse({
    status: 201,
    description: "Kompaniya muvaffaqiyatli ro'yxatdan o'tdi",
  })
  @ApiResponse({
    status: 400,
    description:
      "Kompaniya oldin ro'yxatdan o'tgan yoki malumot kiritishda xatolik!",
  })
  @HttpCode(201)
  @Post("companies/sign-up")
  async signUpCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyAuthService.signUp(createCompanyDto);
  }

  //____________________-SIGN-IN-____________________
  @ApiOperation({
    summary: "Kompaniya tizimga kirishi",
    description: "Email va parol orqali tizimga kirish va access token olish.",
  })
  @ApiBody({
    type: SignInDto,
    description: "Tizimga kirish uchun email va parol",
  })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli tizimga kirildi va access token qaytarildi",
  })
  @ApiResponse({
    status: 400,
    description: "Email yoki parol noto'g'ri",
  })
  @ApiResponse({
    status: 401,
    description: "Tizimga kirish uchun avtorizatsiya talab qilinadi",
  })
  @HttpCode(200)
  @Post("companies/sign-in")
  async signInCompany(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.companyAuthService.signIn(signInDto, res);
  }

  //____________________-SIGN-OUT-____________________
  @ApiOperation({
    summary: "Kompaniya tizimdan chiqishi",
    description:
      "Refresh token orqali kompaniya tizimdan chiqadi. Malumotlar bazasida refreshToken va cookie tozalanadi",
  })
  @ApiResponse({
    status: 200,
    description: "Muvaffaqiyatli tizimdan chiqdingiz",
  })
  @ApiResponse({
    status: 400,
    description: "Refresh token mavjud emas",
  })
  @HttpCode(200)
  @Post("companies/sign-out")
  signOutCompany(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.companyAuthService.signOut(refreshToken, res);
  }

  //____________________-ACTIVATE-COMPANY-____________________
  @ApiOperation({
    summary: "Kompaniya faollashtirish",
    description:
      "Bu endpoint kompaniya hisobini faollashtirish uchun yagona aktivatsiya linkidan foydalaniladi.",
  })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi hisobi muvaffaqiyatli faollashtirildi.",
  })
  @ApiResponse({
    status: 400,
    description: "Link topilmadi",
  })
  @Get("companies/activate/:link")
  activateCompany(@Param("link") link: string) {
    return this.companyAuthService.activateCompany(link);
  }

  //____________________-REFRESH-COMPANY-____________________
  @ApiOperation({
    summary: "Kompaniyaning refresh tokenini yangilash",
    description:
      "Berilgan ID bo‘yicha refresh tokenni yangilaydi va yangi access token qaytariladi.",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Kompaniyaning unikal identifikatori",
  })
  @ApiResponse({
    status: 200,
    description: "Access token muvaffaqiyatli yangilandi",
  })
  @ApiResponse({
    status: 400,
    description: "Refresh token noto‘g‘ri yoki foydalanuvchi topilmadi",
  })
  @ApiResponse({
    status: 401,
    description: "Refresh token mavjud emas",
  })
  @HttpCode(200)
  @Post("companies/:id/refresh")
  refreshCompany(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.companyAuthService.refreshToken(id, refreshToken, res);
  }
}
