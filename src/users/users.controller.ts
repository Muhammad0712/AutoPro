import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "./models/user.model";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ___________________-CREATE-USER-___________________
  @ApiOperation({ summary: "Yangi foydalanuvchi qo'shish" })
  @ApiResponse({ status: 201, type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // ___________________-FINDALL-USER-___________________
  @ApiOperation({
    summary: "Barcha foydalanuvchilarni olish",
    description:
      "Bu endpoint barcha foydalanuvchilar ro‘yxatini olish uchun ishlatiladi.",
  })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchilar ro‘yxati muvaffaqiyatli qaytarildi.",
    type: [User],
  })
  @ApiResponse({
    status: 400,
    description: "So‘rovni bajarishda xatolik yuz berdi.",
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // ___________________-FINDONE-USER-___________________
  @ApiOperation({
    summary: "1ta foydalanuvchini olish",
    description: "Bu endpoint 1ta foydalanuvchini olish uchun ishlatiladi.",
  })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi muvaffaqiyatli qaytarildi.",
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: "So‘rovni bajarishda xatolik yuz berdi.",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  // ___________________-UPDATE-USER-___________________
  @ApiOperation({
    summary: "Foydalanuvchini malumotlarini o'zgartirish",
    description: "Bu endpoint malumotlarini o'zgartirish uchun ishlatiladi.",
  })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi malumotlari muvaffaqiyatli o'zgartirildi.",
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: "So‘rovni bajarishda xatolik yuz berdi.",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // ___________________-DELETE-USER-___________________
  @ApiOperation({
    summary: "Foydalanuvchini o'chirish",
    description: "Bu endpoint foydalanuvchini o'chirish uchun ishlatiladi.",
  })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi malumotlari muvaffaqiyatli o'chirildi.",
  })
  @ApiResponse({
    status: 400,
    description: "So‘rovni bajarishda xatolik yuz berdi.",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }
}
