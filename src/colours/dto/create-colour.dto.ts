import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateColourDto {
  @ApiProperty({
    example: "Qora",
    description: "Rang nomi",
  })
  @IsNotEmpty({ message: "Rang nomi bo'sh bo'lmasligi kerak" })
  @IsString({ message: "Rang nomi matn ko'rinishida bo'lishi kerak" })
  name: string;

  @ApiProperty({
    example: "#000000",
    description: "Rang kodi (hex formatda)",
  })
  @IsNotEmpty({ message: "Rang kodi bo'sh bo'lmasligi kerak" })
  @IsString({ message: "Rang kodi matn ko'rinishida bo'lishi kerak" })
  code: string;
}
