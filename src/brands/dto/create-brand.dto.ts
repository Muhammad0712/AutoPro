import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBrandDto {
  @ApiProperty({
    example: "Muhammad",
    description: "Bu yerga brand nomi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos brand nomini kiriting" })
  name: string;
}
