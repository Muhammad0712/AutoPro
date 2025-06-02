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
import { ColoursService } from "./colours.service";
import { CreateColourDto } from "./dto/create-colour.dto";
import { UpdateColourDto } from "./dto/update-colour.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Colour } from "./models/colour.model";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

@Controller("colours")
export class ColoursController {
  constructor(private readonly coloursService: ColoursService) {}

  @ApiOperation({
    summary: "Yangi rang qo'shish",
    description: "Bu endpoint orqali yangi rang nomi va kodini qo'shish mumkin",
  })
  @ApiResponse({
    status: 201,
    description: "Yangi rang muvaffaqiyatli qo'shildi",
    type: CreateColourDto,
  })
  @ApiResponse({
    status: 400,
    description: "Rang qo'shishda xatolik yuz berdi",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createColourDto: CreateColourDto) {
    return this.coloursService.create(createColourDto);
  }

  @ApiOperation({
    summary: "Ranglar ro'yxatini olish",
    description: "Barcha mavjud ranglar ro'yxatini qaytaradi",
  })
  @ApiResponse({
    status: 200,
    description: "Ranglar ro'yxati muvaffaqiyatli olindi",
    type: [Colour],
  })
  @ApiResponse({
    status: 400,
    description: "Ranglar ro'yxatini olishda xatolik yuz berdi",
  })
  @Get()
  findAll() {
    return this.coloursService.findAll();
  }

  @ApiOperation({
    summary: "Rangni ID orqali olish",
    description: "Kiritilgan ID orqali bitta rangni olish mumkin",
  })
  @ApiResponse({
    status: 200,
    description: "Rang topildi",
    type: Colour,
  })
  @ApiResponse({
    status: 404,
    description: "Bunday ID bilan rang topilmadi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.coloursService.findOne(+id);
  }

  @ApiOperation({
    summary: "Rangni ID orqali o'zgartirish",
    description: "Kiritilgan ID orqali mavjud rangni yangilash",
  })
  @ApiResponse({
    status: 200,
    description: "Rang ma'lumotlari yangilandi",
    type: UpdateColourDto,
  })
  @ApiResponse({
    status: 400,
    description: "Yangilashda xatolik yuz berdi",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateColourDto: UpdateColourDto) {
    return this.coloursService.update(+id, updateColourDto);
  }

  @ApiOperation({
    summary: "Rangni ID orqali o'chirish",
    description: "Kiritilgan ID orqali rangni o'chirib tashlaydi",
  })
  @ApiResponse({
    status: 200,
    description: "Rang muvaffaqiyatli o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "O'chirilmoqchi bo'lgan rang topilmadi",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.coloursService.remove(+id);
  }
}
