import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from "@nestjs/common";
import { ContractsService } from "./contracts.service";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Contract } from "./models/contract.model";
import { Roles } from "../common/decorators/roles-auth.decorator";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
@Controller("contracts")
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @ApiOperation({
    summary: "Yangi shartnoma qo'shish",
    description: "Bu endpoint orqali yangi shartnoma qo'shiladi",
  })
  @ApiResponse({
    status: 201,
    description: "Shartnoma muvaffaqiyatli qo'shildi",
    type: CreateContractDto,
  })
  @ApiResponse({
    status: 400,
    description: "Shartnoma qo'shishda xatolik!",
  })
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(createContractDto);
  }

  @ApiOperation({
    summary: "Shartnomalar ro'yxatini olish",
    description: "Bu endpoint orqali barcha shartnomalar ro'yxati olinadi",
  })
  @ApiResponse({
    status: 200,
    description: "Shartnomalar ro'yxati",
    type: [Contract],
  })
  @ApiResponse({
    status: 400,
    description: "Shartnomalar ro'yxatini chiqarishda xatolik!",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.contractsService.findAll();
  }

  @ApiOperation({
    summary: "ID orqali shartnomani olish",
    description: "Bu endpoint orqali berilgan ID bo'yicha shartnoma olinadi",
  })
  @ApiResponse({
    status: 200,
    description: "Shartnoma topildi",
    type: Contract,
  })
  @ApiResponse({
    status: 404,
    description: "Shartnoma topilmadi",
  })
  @Roles("superadmin", "admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.contractsService.findOne(+id);
  }

  @ApiOperation({
    summary: "Shartnomani yangilash",
    description:
      "Bu endpoint orqali berilgan ID bo'yicha shartnoma yangilanadi",
  })
  @ApiResponse({
    status: 200,
    description: "Shartnoma yangilandi",
    type: UpdateContractDto,
  })
  @ApiResponse({
    status: 400,
    description: "Yangilashda xatolik yuz berdi",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateContractDto: UpdateContractDto
  ) {
    return this.contractsService.update(+id, updateContractDto);
  }

  @ApiOperation({
    summary: "Shartnomani o'chirish",
    description: "Bu endpoint orqali shartnoma o'chiriladi",
  })
  @ApiResponse({
    status: 200,
    description: "Shartnoma o'chirildi",
  })
  @ApiResponse({
    status: 404,
    description: "Shartnoma topilmadi",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.contractsService.remove(+id);
  }

  @ApiOperation({
    summary: "Shartnomalar ro'yxatini olish userlar uchun",
    description:
      "Bu endpoint orqali o'ziga tegishli bo'lgan barcha shartnomalar ro'yxati olinadi",
  })
  @ApiResponse({
    status: 200,
    description: "Shartnomalar ro'yxati",
    type: [Contract],
  })
  @ApiResponse({
    status: 400,
    description: "Shartnomalar ro'yxatini chiqarishda xatolik!",
  })
  @Roles("user")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("user/:id")
  findAllUserContracts(@Param("id") id: string) {
    return this.contractsService.findAllUserContracts(+id);
  }

  @ApiOperation({
    summary: "Shartnomalar ro'yxatini olish companiyalar uchun",
    description:
      "Bu endpoint orqali o'ziga tegishli bo'lgan barcha shartnomalar ro'yxati olinadi ",
  })
  @ApiResponse({
    status: 200,
    description: "Shartnomalar ro'yxati",
    type: [Contract],
  })
  @ApiResponse({
    status: 400,
    description: "Shartnomalar ro'yxatini chiqarishda xatolik!",
  })
  @Roles("company")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("company/:id")
  findAllCompanyContracts(@Param("id") id: string) {
    return this.contractsService.findAllCompanyContracts(+id);
  }

}
