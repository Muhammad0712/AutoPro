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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { User } from "./models/user.model";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { JwtSelfGuard } from "../common/guards/jwt-self.guard";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ___________________-CREATE-USER-___________________
  @ApiOperation({ summary: "Yangi foydalanuvchi qo'shish" })
  @ApiResponse({
    status: 201,
    description: "Foydalanuvchi muvaffaqiyatli qo'shildi",
    type: CreateUserDto,
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // ___________________-FINDONE-USER-___________________
  @ApiOperation({
    summary: "Foydalanuvchini id orqali o'z malumotlarini chiqarish",
    description:
      "Bu endpoint foydalanuvchi o'z malumotlarini olish uchun ishlatiladi.",
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
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  // ___________________-FINDONE-ONE-SELF-___________________
  @ApiOperation({
    summary: "Foydalanuvchi o'z malumotlarini chiqarishi",
    description:
      "Bu endpoint foydalanuvchi o'z malumotlarini olish uchun ishlatiladi.",
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
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard, JwtSelfGuard)
  @Get("my-self/:id")
  seeOneSelf(@Param("my-self/:id") id: string) {
    return this.usersService.findOne(+id);
  }

  // ___________________-UPDATE-ONE-SELF-___________________
  @ApiOperation({
    summary: "Foydalanuvchi o'z malumotlarini o'zgartirishi",
    description:
      "Bu endpoint orqali foydalanuvchi o'z malumotlarini o'zgartirish uchun ishlatiladi.",
  })
  @ApiResponse({
    status: 200,
    description: "Foydalanuvchi malumotlaringiz muvaffaqiyatli o'zgartirildi.",
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 400,
    description: "So‘rovni bajarishda xatolik yuz berdi.",
  })
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard, JwtSelfGuard)
  @Patch("my-self/:id")
  changeOneSelf(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // ___________________-DELETE-ONE-SELF-___________________
  @ApiOperation({
    summary: "Foydalanuvchi o'z malumotlarini o'chirishi",
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
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete("my-self/:id")
  deleteOneSelf(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  // ____________________-UPDATE-PASSWORD-____________________
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
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard, JwtSelfGuard)
  @Patch("password/:id")
  async updatePassword(
    @Param("id") id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.usersService.updatePassword(+id, updatePasswordDto)
  }
}
