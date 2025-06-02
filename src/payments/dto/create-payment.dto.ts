import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({
    example: 3,
    description: "To‘lov qaysi shartnomaga tegishli ekanligi (contract_id)",
  })
  @IsNotEmpty({ message: "Shartnoma ID raqami bo‘sh bo‘lmasligi kerak!" })
  @IsNumber({}, { message: "contract_id butun son bo‘lishi kerak!" })
  contract_id: number;

  @ApiProperty({
    example: 180000000,
    description: "To‘lov miqdori (so‘mda)",
  })
  @IsNotEmpty({ message: "To‘lov miqdorini kiriting!" })
  @IsNumber({}, { message: "To‘lov miqdori son bo‘lishi kerak!" })
  @Min(1, { message: "To‘lov miqdori 1 so‘mdan katta bo‘lishi kerak!" })
  amount: number;
}
