import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Region } from './models/region.model';

@Controller("regions")
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @ApiOperation({
    summary: "Yangi viloyat qo'shish",
    description: "Bu endpoint orqali yangi viloyat nomi qo'shiladi!",
  })
  @ApiResponse({
    status: 201,
    description: "Yangi viloyat muvaffaqiyatli qo'shildi",
    type: CreateRegionDto,
  })
  @ApiResponse({
    status: 400,
    description: "Viloyat qo'shishda xatolik!",
  })
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @ApiOperation({
    summary: "Viloyatlar ro'yxatini chiqarish",
    description: "Bu endpoint orqali viloyatlar ro'yxati chiqariladi!",
  })
  @ApiResponse({
    status: 200,
    description: "Viloyatlar ro'yxati",
    type: [Region],
  })
  @ApiResponse({
    status: 400,
    description: "Viloyatlar ro'yxatini chiqarishda xatolik!",
  })
  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @ApiOperation({
    summary: "Viloyatni id orqali chiqarish",
    description: "Bu endpoint id orqali Viloyatni chiqarib beradi",
  })
  @ApiResponse({
    status: 200,
    description: "Viloyat muvaffaqiyatli chiqarildi!",
    type: Region,
  })
  @ApiResponse({
    status: 400,
    description: "Bunday viloyat mavjud emas",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.regionsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Viloyatni id orqali o'zgartirish",
    description: "Bu endpoint id orqali Viloyat malumotlari o'zgartiriladi",
  })
  @ApiResponse({
    status: 200,
    description: "Viloyat malumotlari muvaffaqiyatli o'zgartirildi!",
    type: UpdateRegionDto,
  })
  @ApiResponse({
    status: 400,
    description: "Viloyat ma'lumotlarini o'zgartirishda xatolik",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @ApiOperation({
    summary: "Viloyatni id orqali o'chirish",
    description: "Bu endpoint id orqali Viloyatni o'chirib beradi",
  })
  @ApiResponse({
    status: 200,
    description: "Viloyat muvaffaqiyatli o'chirildi!"
  })
  @ApiResponse({
    status: 400,
    description: "Viloyatni o'chirishda xatolik",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.regionsService.remove(+id);
  }
}
