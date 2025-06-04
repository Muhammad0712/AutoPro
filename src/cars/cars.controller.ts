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
import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Car } from "./models/car.model";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("cars")
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiOperation({
    summary: "Yangi avtomobil qo'shish",
    description: "Bu endpoint orqali yangi avtomobil qo'shiladi",
  })
  @ApiResponse({
    status: 201,
    description: "Yangi avtomobil muvaffaqiyatli qo'shildi",
    type: CreateCarDto,
  })
  @ApiResponse({
    status: 400,
    description: "Avtomobil qo'shishda xatolik",
  })
  @Roles("company")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @ApiOperation({
    summary: "Avtomobillar ro'yxatini chiqarish",
    description: "Barcha avtomobillar ro'yxatini qaytaradi",
  })
  @ApiResponse({
    status: 200,
    description: "Avtomobillar ro'yxati",
    type: [Car],
  })
  @ApiResponse({
    status: 404,
    description: "Hech qanday avtomobil topilmadi!",
  })
  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @ApiOperation({
    summary: "ID orqali avtomobilni chiqarish",
    description: "ID orqali bitta avtomobilni qaytaradi",
  })
  @ApiResponse({
    status: 200,
    description: "Avtomobil topildi",
    type: Car,
  })
  @ApiResponse({
    status: 404,
    description: "Bunday ID bilan avtomobil topilmadi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.carsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Avtomobilni yangilash",
    description: "ID orqali avtomobil ma'lumotlarini o'zgartirish",
  })
  @ApiResponse({
    status: 200,
    description: "Avtomobil ma'lumotlari yangilandi",
    type: UpdateCarDto,
  })
  @ApiResponse({
    status: 400,
    description: "Avtomobilni yangilashda xatolik",
  })
  @Roles("company")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @ApiOperation({
    summary: "Avtomobilni o'chirish",
    description: "ID orqali avtomobilni bazadan o'chirish",
  })
  @ApiResponse({
    status: 200,
    description: "Avtomobil muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Avtomobilni o'chirishda xatolik",
  })
  @Roles("company")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.carsService.remove(+id);
  }

  @ApiOperation({
    summary: "O'ziga tegishli bo'lgan avtomobillarni chiqarish",
    description:
      "Bu endpoint orqali kompaniya xodimlari o'z kompaniyasiga tegishli bo'lgan avtomobillar ro'yxtini chiqaradi!",
  })
  @ApiResponse({
    status: 200,
    description: "Companiyaga tegishli moshinalar muvaffaqiyatli qaytarildi!",
    type: [Car]
  })
  @ApiResponse({
    status: 400,
    description: "Companiyaga tegishli moshinalarni chiqarishda xatolik!",
  })
  @ApiResponse({
    status: 404,
    description: "Hech qanday avtomobil topilmadi"
  })
  @Get("company-cars/:id")
  getCompanyCars(@Param("id") id: string) {
    return this.carsService.getCompanyCars(+id);
  }
}
