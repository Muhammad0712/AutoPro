import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCarDto {
  @ApiProperty({
    example: 1,
    description: "Ro'yxatdagi avtomobilning tartib raqami (pozitsiyasi)",
  })
  @IsNotEmpty({ message: "Position bo‘sh bo‘lmasligi kerak" })
  position: number;

  @ApiProperty({
    example: 2022,
    description: "Avtomobil ishlab chiqarilgan yil",
  })
  @IsNotEmpty({ message: "Car year bo‘sh bo‘lmasligi kerak" })
  car_year: number;

  @ApiProperty({ example: 9.8, description: "Tezlashish vaqti (sekund)" })
  @IsNotEmpty({ message: "Acceleration bo‘sh bo‘lmasligi kerak" })
  acceleration: number;

  @ApiProperty({ example: 6.5, description: "Yonilg'i sarfi (litr/100km)" })
  @IsNotEmpty({ message: "Fuel consumption bo‘sh bo‘lmasligi kerak" })
  fuel_consumption: number;

  @ApiProperty({ example: 150, description: "Ot kuchi" })
  @IsNotEmpty({ message: "Horse power bo‘sh bo‘lmasligi kerak" })
  horse_power: number;

  @ApiProperty({ example: 6, description: "Uzatmalar qadamlar soni" })
  @IsNotEmpty({ message: "Transmission step bo‘sh bo‘lmasligi kerak" })
  transmission_step: number;

  @ApiProperty({ example: 180000000, description: "Avtomobil narxi (so‘mda)" })
  @IsNotEmpty({ message: "Price bo‘sh bo‘lmasligi kerak" })
  price: number;

  @ApiProperty({
    example: "/images/cobalt.png",
    description: "Avtomobil rasm yo‘li",
  })
  @IsNotEmpty({ message: "Image path bo‘sh bo‘lmasligi kerak" })
  image_path: string;

  @ApiProperty({ example: 1, description: "Model ID" })
  @IsNotEmpty({ message: "Model ID bo‘sh bo‘lmasligi kerak" })
  model_id: number;

  @ApiProperty({ example: 1, description: "Brend ID" })
  @IsNotEmpty({ message: "Brand ID bo‘sh bo‘lmasligi kerak" })
  brand_id: number;

  @ApiProperty({ example: 3, description: "Kompaniya ID" })
  @IsNotEmpty({ message: "Company ID bo‘sh bo‘lmasligi kerak" })
  company_id: number;
}
