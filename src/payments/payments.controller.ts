import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Payment } from "./models/payment.model";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@ApiTags("To‘lovlar")
@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({
    summary: "Yangi to‘lov qo‘shish",
    description: "Bu endpoint orqali yangi to‘lov qo‘shiladi.",
  })
  @ApiResponse({
    status: 201,
    description: "Yangi to‘lov muvaffaqiyatli qo‘shildi",
    type: CreatePaymentDto,
  })
  @ApiResponse({
    status: 400,
    description: "To‘lov qo‘shishda xatolik",
  })
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @ApiOperation({
    summary: "To‘lovlar ro‘yxatini olish",
    description: "Barcha to‘lovlar ro‘yxatini chiqaradi",
  })
  @ApiResponse({
    status: 200,
    description: "To‘lovlar muvaffaqiyatli chiqarildi",
    type: [Payment],
  })
  @ApiResponse({
    status: 400,
    description: "To‘lovlar ro'yxatini chiqarishda xatolik",
  })
  
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @ApiOperation({
    summary: "To‘lovni ID orqali olish",
    description: "Berilgan ID asosida to‘lovni chiqaradi",
  })
  @ApiResponse({
    status: 200,
    description: "To‘lov topildi",
    type: Payment,
  })
  @ApiResponse({
    status: 404,
    description: "To‘lov topilmadi",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @ApiOperation({
    summary: "To‘lovni yangilash",
    description: "ID orqali mavjud to‘lovni yangilaydi",
  })
  @ApiResponse({
    status: 200,
    description: "To‘lov muvaffaqiyatli yangilandi",
    type: UpdatePaymentDto,
  })
  @ApiResponse({
    status: 400,
    description: "Yangilashda xatolik",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @ApiOperation({
    summary: "To‘lovni o‘chirish",
    description: "ID orqali to‘lovni o‘chirish imkonini beradi",
  })
  @ApiResponse({
    status: 200,
    description: "To‘lov muvaffaqiyatli o‘chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Bunday to‘lov topilmadi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }

  @ApiOperation({
    summary: "Foydalanuvchilar uchun shaxsiy to'lovlarni chiqarish!",
    description:
      "Bu endpoint orqali foydalanuvchilar faqat o'zigagina tegishli bo'lgan to'lovlarni chiqaradi!",
  })
  @ApiResponse({
    status: 200,
    description: "To'lovlaringiz muvaffaqiyatli chiqarildi!",
    type: [Payment],
  })
  @ApiResponse({
    status: 400,
    description: "To'lovlaringizni chiqarishda xatolik",
  })
  @ApiResponse({
    status: 404,
    description: "Sizda hech qanday to'lov mavjud emas",
  })
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("my-payments/:id")
  getMyPayments(@Param("id") id: string) {
    return this.paymentsService.getMyPayments(+id);
  }

  @ApiOperation({
    summary: "Companiyalarning o'ziga tegishli to'lovlarni chiqarish!",
    description:
      "Bu endpoint orqali companiya xodimlari faqat o'zigagina tegishli bo'lgan to'lovlarni chiqaradi!",
  })
  @ApiResponse({
    status: 200,
    description: "To'lovlaringiz muvaffaqiyatli chiqarildi!",
    type: [Payment],
  })
  @ApiResponse({
    status: 400,
    description: "To'lovlaringizni chiqarishda xatolik",
  })
  @ApiResponse({
    status: 404,
    description: "Sizda hech qanday to'lov mavjud emas",
  })
  @Roles("company")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("company-payments/:id")
  getCompanyPayments(@Param("id") id: string) {
    return this.paymentsService.getCompanyPayments(+id);
  }
}
