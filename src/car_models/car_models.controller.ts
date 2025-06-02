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
import { CarModelsService } from "./car_models.service";
import { CreateCarModelDto } from "./dto/create-car_model.dto";
import { UpdateCarModelDto } from "./dto/update-car_model.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CarModel } from "./models/car_model.mode";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@Controller("car-models")
export class CarModelsController {
  constructor(private readonly carModelsService: CarModelsService) {}

  @ApiOperation({
    summary: "Yangi model qo'shish",
    description: "Bu endpoint orqali yangi model nomi qo'shiladi!",
  })
  @ApiResponse({
    status: 201,
    description: "Yangi model qo'shildi",
    type: CreateCarModelDto,
  })
  @ApiResponse({
    status: 400,
    description: "Avtomobil modelini qo'shishda xatolik!",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createCarModelDto: CreateCarModelDto) {
    return this.carModelsService.create(createCarModelDto);
  }

  @ApiOperation({
    summary: "Modellar ro'yxatini chiqarish",
    description: "Bu endpoint orqali modellar ro'yxati chiqariladi!",
  })
  @ApiResponse({
    status: 200,
    description: "Modellar ro'yxati",
    type: [CarModel],
  })
  @ApiResponse({
    status: 400,
    description: "Modellar ro'yxatini chiqarishda xatolik!",
  })
  @Get()
  findAll() {
    return this.carModelsService.findAll();
  }

  @ApiOperation({
    summary: "Modelni id orqali chiqarish",
    description: "Bu endpoint id orqali modelni chiqarib beradi",
  })
  @ApiResponse({
    status: 200,
    description: "Brand muvaffaqiyatli chiqarildi!",
    type: CarModel,
  })
  @ApiResponse({
    status: 400,
    description: "Bunday model mavjud emas",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.carModelsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Modelni id orqali o'zgartirish",
    description: "Bu endpoint id orqali model malumotlari o'zgartiriladi",
  })
  @ApiResponse({
    status: 200,
    description: "Model malumotlari muvaffaqiyatli o'zgartirildi!",
    type: UpdateCarModelDto,
  })
  @ApiResponse({
    status: 400,
    description: "Model ma'lumotlarini o'zgartirishda xatolik",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCarModelDto: UpdateCarModelDto
  ) {
    return this.carModelsService.update(+id, updateCarModelDto);
  }

  @ApiOperation({
    summary: "Modelni id orqali o'chirish",
    description: "Bu endpoint id orqali modelni o'chirib beradi",
  })
  @ApiResponse({
    status: 200,
    description: "Model muvaffaqiyatli o'chirildi!",
  })
  @ApiResponse({
    status: 400,
    description: "Modelni o'chirishda xatolik",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.carModelsService.remove(+id);
  }
}
