import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { BrandsService } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Brand } from "./models/brand.model";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@Controller("brands")
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @ApiOperation({
    summary: "Yangi brand qo'shish",
    description: "Bu endpoint orqali yangi brand nomi qo'shiladi!",
  })
  @ApiResponse({
    status: 201,
    description: "Yangi brand qo'shildi",
    type: CreateBrandDto,
  })
  @ApiResponse({
    status: 400,
    description: "Brand qo'shishda xatolik!",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @ApiOperation({
    summary: "Brandlar ro'yxatini chiqarish",
    description: "Bu endpoint orqali brandlar ro'yxati chiqariladi!",
  })
  @ApiResponse({
    status: 200,
    description: "Brandlar ro'yxati",
    type: [Brand],
  })
  @ApiResponse({
    status: 400,
    description: "Brandlar ro'yxatini chiqarishda xatolik!",
  })
  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  @ApiOperation({
    summary: "Brandni id orqali chiqarish",
    description: "Bu endpoint id orqali brandni chiqarib beradi",
  })
  @ApiResponse({
    status: 200,
    description: "Brand muvaffaqiyatli chiqarildi!",
    type: Brand,
  })
  @ApiResponse({
    status: 400,
    description: "Bunday brand mavjud emas",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.brandsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Brandni id orqali o'zgartirish",
    description: "Bu endpoint id orqali brand malumotlari o'zgartiriladi",
  })
  @ApiResponse({
    status: 200,
    description: "Brand malumotlari muvaffaqiyatli o'zgartirildi!",
    type: UpdateBrandDto,
  })
  @ApiResponse({
    status: 400,
    description: "Brand ma'lumotlarini o'zgartirishda xatolik",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @ApiOperation({
    summary: "Brandni id orqali o'chirish",
    description: "Bu endpoint id orqali brandni o'chirib beradi",
  })
  @ApiResponse({
    status: 200,
    description: "Brand muvaffaqiyatli o'chirildi!",
  })
  @ApiResponse({
    status: 400,
    description: "Brandni o'chirishda xatolik",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.brandsService.remove(+id);
  }
}
