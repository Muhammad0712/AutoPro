import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from "class-validator";

export class CreateContractDto {
  @ApiProperty({
    example: 12,
    description: "Shartnoma muddati (oylarda)",
  })
  @IsNotEmpty({ message: "Shartnoma muddatini kiriting!" })
  @IsNumber({}, { message: "Muddat raqam bo'lishi kerak!" })
  term: number;

  @ApiProperty({
    example: 3,
    description: "Avtomobil ID raqami",
  })
  @IsNotEmpty({ message: "Avtomobil ID raqamini kiriting!" })
  @IsNumber({}, { message: "Avtomobil ID raqam bo'lishi kerak!" })
  car_id: number;

  @ApiProperty({
    example: 2,
    description: "Kompaniya ID raqami",
  })
  @IsNotEmpty({ message: "Kompaniya ID raqamini kiriting!" })
  @IsNumber({}, { message: "Kompaniya ID raqam bo'lishi kerak!" })
  company_id: number;

  @ApiProperty({
    example: 101,
    description: "Foydalanuvchi ID raqami",
  })
  @IsNotEmpty({ message: "Foydalanuvchi ID raqamini kiriting!" })
  @IsNumber({}, { message: "Foydalanuvchi ID raqam bo'lishi kerak!" })
  user_id: number;

  @ApiProperty({
    example: "cash",
    description: "To'lov turi (enum: cash, card)",
  })
  @IsNotEmpty({ message: "To'lov turini tanlang!" })
  @IsEnum(["cash", "card"], { message: "To‘lov turi noto‘g‘ri!" })
  payment_type: string;

  @ApiProperty({
    example: "2025-05-31",
    description: "Shartnoma tuzilgan sana",
  })
  @IsNotEmpty({ message: "Sanani kiriting!" })
  @IsDateString({}, { message: "Sana noto‘g‘ri formatda!" })
  created_at: Date;

  @ApiProperty({
    example: true,
    description: "Shartnoma holati (faol yoki yo‘q)",
  })
  @IsNotEmpty({ message: "Holatni kiriting!" })
  @IsBoolean({ message: "Holat boolean (true/false) bo'lishi kerak!" })
  status: boolean;
}
