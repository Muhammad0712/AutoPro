import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AdminsService } from "./admins.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Admin } from "./models/admin.model";

@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  // ___________________-CREATE-ADMIN-___________________
  @ApiOperation({ summary: "Yangi admin qo'sish" })
  @ApiResponse({ status: 201, type: CreateAdminDto })
  @ApiResponse({
    status: 400,
    description: "Bunday emailli admin mavjud yoki admin qo'shishda xatolik",
  })
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  // ___________________-FINDALL-ADMIN-___________________
  @ApiOperation({ summary: "Adminlar ro'yxatini chiqarish" })
  @ApiResponse({ status: 200, type: [Admin] })
  @ApiResponse({ status: 404, description: "Hech qanday admin topilmadi!" })
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  // ___________________-FINONE-ADMIN-___________________
  @ApiOperation({ summary: "id orqali adminni chiqarish" })
  @ApiResponse({ status: 200, type: Admin })
  @ApiResponse({ status: 404, description: "Bunday admin topilmadi!" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.adminsService.findOne(+id);
  }

  // ___________________-UPDATE-ADMIN-___________________
  @ApiOperation({ summary: "id orqali adminni malumotlarini o'zgartirish" })
  @ApiResponse({ status: 200, type: UpdateAdminDto })
  @ApiResponse({
    status: 400,
    description: "Admin malumotlarini o'zgartirishda xatolik!",
  })
  @ApiResponse({ status: 404, description: "Bunday admin topilmadi!" })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(+id, updateAdminDto);
  }

  // ___________________-DELETE-ADMIN-___________________
  @ApiOperation({ summary: "id orqali adminni o'chirish" })
  @ApiResponse({
    status: 200,
    description: "admin muvaffaqiyatli o'chirildi! ",
  })
  @ApiResponse({ status: 404, description: "Bunday admin topilmadi!" })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.adminsService.remove(+id);
  }

  //___________________-ACTIVATE-ADMIN-___________________
  @Patch(":id")
  activateAdmin(@Param("id") id: string, @Body() is_active: boolean) {
    
  }
}
