import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateRegionDto {
  @ApiProperty({
    example: "Toshkent",
    description: "Bu yerga viloyat nomi kiritiladi!",
  })
  @IsNotEmpty({message: "Iltimos viloyatni kiriting!"})
  name: string;
}
