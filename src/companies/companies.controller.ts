import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Company } from "./models/company.model";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";
import { UpdatePasswordDto } from "../users/dto/update-password.dto";

@Controller("companies")
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  //____________________-CREATE-COMPANY-____________________
  @ApiOperation({
    summary: "Yangi companiya qo'shish",
    description: "Bu endpoint orqali yangi companiya qo'shiladi!",
  })
  @ApiResponse({
    status: 201,
    description: "Yangi companiya qo'shildi",
    type: CreateCompanyDto,
  })
  @ApiResponse({
    status: 400,
    description:
      "Companiya qo'shishda xatolik yoki tarmoqda bunday foydalanuvchi mavjud!",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(201)
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  //____________________-FINDALL-COMPANIES-____________________
  @ApiOperation({
    summary: "Barcha kompaniyalar ro'yxatini chiqarish",
    description: "Bu endpoint orqali companiyalar ro'yxati chiqariladi!",
  })
  @ApiResponse({
    status: 200,
    description: "Barcha kompaniyalar ro'yxati",
    type: [Company],
  })
  @ApiResponse({
    status: 400,
    description: "Companiyalar ro'yxatini chiqarishda xatolik!",
  })
  @ApiResponse({
    status: 404,
    description: "Hech qanday companiya topilmadi",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  //____________________-FINDONE-COMPANY-____________________
  @ApiOperation({
    summary: "Id orqali kompaniyani chiqarish",
    description: "Bu endpoint id orqali companiya malumotlari chiqaradi!",
  })
  @ApiResponse({
    status: 200,
    description: "Id orqali topilgan kompaniya",
    type: Company,
  })
  @ApiResponse({
    status: 400,
    description: "Kompaniyani chiqarishda xatolik!",
  })
  @ApiResponse({
    status: 404,
    description: "Bunday kompaniya mavjud emas",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.companiesService.findOne(+id);
  }

  //____________________-UPDATE-COMPANY-____________________
  @ApiOperation({
    summary: "Id orqali kompaniya malumotlarini o'zgartirish",
    description: "Bu endpoint id orqali companiya malumotlari o'zgartiradi!",
  })
  @ApiResponse({
    status: 200,
    description: "Kompaniya malumotlari muvaffaqiyatli o'zgartirildi",
    type: UpdateCompanyDto,
  })
  @ApiResponse({
    status: 400,
    description: "Kompaniyani o'zgartirishda xatolik!",
  })
  @ApiResponse({
    status: 404,
    description: "Bunday kompaniya mavjud emas",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  //____________________-DELETE-COMPANY-____________________
  @ApiOperation({
    summary: "Id orqali kompaniyani o'chirish",
    description: "Bu endpoint id orqali companiya malumotlari o'chiradi!",
  })
  @ApiResponse({
    status: 200,
    description: "Kompaniya muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 400,
    description: "Kompaniyani o'chirishda xatolik!",
  })
  @ApiResponse({
    status: 404,
    description: "Bunday kompaniya mavjud emas",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(200)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.companiesService.remove(+id);
  }

  //____________________-FIND-ONE-SELF-____________________
  @ApiOperation({
    summary: "Kompaniya o'z malumotlarini chiqarishi",
    description: "Bu endpoint id orqali companiya malumotlari chiqaradi!",
  })
  @ApiResponse({
    status: 200,
    description: "Id orqali topilgan kompaniya",
    type: Company,
  })
  @ApiResponse({
    status: 400,
    description: "Kompaniyani chiqarishda xatolik!",
  })
  @ApiResponse({
    status: 404,
    description: "Bunday kompaniya mavjud emas",
  })
  @Roles("company")
  @UseGuards(JwtAuthGuard, RolesGuard, JwtSelfGuard)
  @HttpCode(200)
  @Get("my-self/:id")
  seeOneSelf(@Param("id") id: string) {
    return this.companiesService.findOne(+id);
  }

  //____________________-UPDATE-ONE-SELF-____________________
  @ApiOperation({
    summary: "Kompaniya o'z malumotlarini o'zgartirishi",
    description: "Bu endpoint id orqali companiya malumotlari o'zgartiradi!",
  })
  @ApiResponse({
    status: 200,
    description: "Kompaniya malumotlari muvaffaqiyatli o'zgartirildi",
    type: UpdateCompanyDto,
  })
  @ApiResponse({
    status: 400,
    description: "Kompaniyani o'zgartirishda xatolik!",
  })
  @ApiResponse({
    status: 404,
    description: "Bunday kompaniya mavjud emas",
  })
  @Roles("company")
  @UseGuards(JwtAuthGuard, RolesGuard, JwtSelfGuard)
  @HttpCode(200)
  @Patch("my-self/:id")
  changeOneSelf(
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

  //____________________-DELETE-ONE-SELF-____________________
  @ApiOperation({
    summary: "Kompaniya o'z malumotini o'chirishi",
    description: "Bu endpoint id orqali companiya malumotlari o'chiradi!",
  })
  @ApiResponse({
    status: 200,
    description: "Kompaniya muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 400,
    description: "Kompaniyani o'chirishda xatolik!",
  })
  @ApiResponse({
    status: 404,
    description: "Bunday kompaniya mavjud emas",
  })
  @Roles("company")
  @UseGuards(JwtAuthGuard, RolesGuard, JwtSelfGuard)
  @HttpCode(200)
  @Delete("my-self/:id")
  deleteOneSelf(@Param("id") id: string) {
    return this.companiesService.remove(+id);
  }

  @ApiOperation({
      summary: "Parolni o'zgartirish user uchun",
      description: "Bu endpoint orqali foydalanuvchi parolini o'zgartiradi!",
    })
    @ApiResponse({
      status: 200,
      description: "Parol muvaffaqiyatli o'zgartirildi!",
    })
    @ApiResponse({
      status: 400,
      description: "Parol xato yoki parollar bir xil emas!",
    })
    @ApiResponse({
      status: 404,
      description: "Bunday foydalanuvchi topilmadi!",
    })
    @Roles("company")
    @UseGuards(JwtAuthGuard, RolesGuard, JwtSelfGuard)
    @Patch("password/:id")
    async updatePassword(
      @Param("id") id: string,
      @Body() updatePasswordDto: UpdatePasswordDto
    ) {
      return this.companiesService.updatePassword(+id, updatePasswordDto)
    }
}
