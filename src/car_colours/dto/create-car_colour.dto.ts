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
    example: 10,
    description: "Shu rangli moshinalar soni"
  })
  @IsInt({message: "count son bo'lishi kerak"})
  count: number;
}
