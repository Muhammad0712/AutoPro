import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Column, DataType } from "sequelize-typescript";

export class CreateAdminDto {
  @ApiProperty({
    example: "Muhammad",
    description: "Bu yerga admin ismi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos ismingini kiriting" })
  first_name: string;

  @ApiProperty({
    example: "Nematilloyev",
    description: "Bu yerga admin familyasi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos familyangizni kiriting" })
  last_name: string;

  @ApiProperty({
    example: "example@gmail.com",
    description: "Bu yerga admin email pochtasi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos emailingizni kiriting" })
  @IsEmail({}, { message: "Iltimos emailingizni to'g'ri kiriting" })
  email: string;

  @ApiProperty({
    example: "Example0000",
    description: "Bu yerga admin paroli kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos parolingizni kiriting" })
  @Matches(/^(?=.*\d).{8,}$/, {
    message:
      "Parol kamida 8 ta belgidan iborat bo‘lishi va kamida 1 ta raqam bo‘lishi kerak!",
  })
  password: string;

}
