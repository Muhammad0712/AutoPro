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
import { CarColoursService } from "./car_colours.service";
import { CreateCarColourDto } from "./dto/create-car_colour.dto";
import { UpdateCarColourDto } from "./dto/update-car_colour.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CarColour } from "./models/car_colour.model";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@Controller("car-colours")
export class CarColoursController {
  constructor(private readonly carColoursService: CarColoursService) {}

  @ApiOperation({
    summary: "Yangi rang qo'shish",
    description: "Bu endpoint orqali yangi avtomobil rangi qo'shiladi!",
  })
  @ApiResponse({
    status: 201,
    description: "Yangi rang qo'shildi",
    type: CreateCarColourDto,
  })
  @ApiResponse({
    status: 400,
    description: "Avtomobil rangini qo'shishda xatolik!",
  })
  @Roles("company")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCarColourDto: CreateCarColourDto) {
    return this.carColoursService.create(createCarColourDto);
  }

  @ApiOperation({
    summary: "Ranglar ro'yxatini chiqarish",
    description: "Bu endpoint orqali avtomobil ranglari ro'yxati chiqariladi!",
  })
  @ApiResponse({
    status: 200,
    description: "Ranglar ro'yxati",
    type: [CarColour],
  })
  @ApiResponse({
    status: 400,
    description: "Ranglar ro'yxatini chiqarishda xatolik!",
  })
  @Get()
  findAll() {
    return this.carColoursService.findAll();
  }

  @ApiOperation({
    summary: "Rangni id orqali chiqarish",
    description: "Bu endpoint id orqali avtomobil rangini chiqarib beradi",
  })
  @ApiResponse({
    status: 200,
    description: "Rang muvaffaqiyatli chiqarildi!",
    type: CarColour,
  })
  @ApiResponse({
    status: 400,
    description: "Bunday rang mavjud emas",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.carColoursService.findOne(+id);
  }

  @ApiOperation({
    summary: "Rangni id orqali o'zgartirish",
    description: "Bu endpoint id orqali rang ma'lumotlari o'zgartiriladi",
  })
  @ApiResponse({
    status: 200,
    description: "Rang ma'lumotlari muvaffaqiyatli o'zgartirildi!",
    type: UpdateCarColourDto,
  })
  @ApiResponse({
    status: 400,
    description: "Rang ma'lumotlarini o'zgartirishda xatolik",
  })
  @Roles("company")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCarColourDto: UpdateCarColourDto
  ) {
    return this.carColoursService.update(+id, updateCarColourDto);
  }

  @ApiOperation({
    summary: "Rangni id orqali o'chirish",
    description: "Bu endpoint id orqali rangni o'chirib beradi",
  })
  @ApiResponse({
    status: 200,
    description: "Rang muvaffaqiyatli o'chirildi!",
  })
  @ApiResponse({
    status: 400,
    description: "Rangni o'chirishda xatolik",
  })
  @Roles("company")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.carColoursService.remove(+id);
  }

  @ApiOperation({
    summary: "Mavjud avtomobil va ranglarini chiqarish!",
    description: "Bu yerda avtomobil id raqami orqali nechta rangi mavjudligi aniqlanadi"
  })
  @Get("my-cars/:id")
  getCompanyCarColors(@Param("id") id: string) {
    return this.carColoursService.getCompanyCarColours(+id)
  }
}
  