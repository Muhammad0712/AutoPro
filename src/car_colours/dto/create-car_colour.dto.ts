import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, Min } from "class-validator";

export class CreateCarColourDto {
  @ApiProperty({
    example: 3,
    description: "Car jadvalidagi ID (qaysi avtomobil)",
  })
  @IsNotEmpty({ message: "car_id maydoni bo'sh bo'lmasligi kerak" })
  @IsInt({ message: "car_id butun son bo‘lishi kerak" })
  car_id: number;

  @ApiProperty({
    example: 2,
    description: "Colour jadvalidagi ID (qaysi rang)",
  })
  @IsNotEmpty({ message: "colour_id maydoni bo'sh bo'lmasligi kerak" })
  @IsInt({ message: "colour_id butun son bo‘lishi kerak" })
  colour_id: number;

  @ApiProperty({
    example: 15,
    description: "Shu rangdagi avtomobil soni",
  })
  @IsInt({ message: "count butun son bo‘lishi kerak" })
  @Min(0, { message: "count manfiy bo‘lmasligi kerak" })
  count: number;
}
