import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCarModelDto {
  @ApiProperty({
    example: "Cobalt",
    description: "Automobil modeli nomi",
  })
  @IsNotEmpty({message: "Avtomobil modeli nomini kiriting!"})
  name: string;

  @ApiProperty({
    example: 1,
    description: "Qaysi brandga tegishli ekanligi.",
  })
  @IsNotEmpty({message: "Brandni tanlang"})
  brandId: number;
}
