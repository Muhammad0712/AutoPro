import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber, Matches } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: "Muhammad",
    description: "Foydalanuvchining ismi",
  })
  @IsNotEmpty({ message: "Iltimos ismingizni kiriting" })
  first_name: string;

  @ApiProperty({
    example: "Nematilloyev",
    description: "Foydalanuvchi familyasi!",
  })
  @IsNotEmpty({ message: "Iltimos familyangizni kiriting" })
  last_name: string;

  @ApiProperty({
    example: "example@gmail.com",
    description: "Foydalanuvchi email pochtasi",
  })
  @IsNotEmpty({ message: "Iltimos emailingizni kiriting" })
  email: string;

  @ApiProperty({
    example: "Example0000",
    description: "Foydalanuvchi paroli",
  })
  @IsNotEmpty({ message: "Iltimos parolingizni kiriting" })
  @Matches(/^(?=.*\d).{8,}$/, {
    message:
      "Parol kamida 8 ta belgidan iborat bo‘lishi va kamida 1 ta raqam bo‘lishi kerak!1",
  })
  password: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchi telefon raqami",
  })
  @IsPhoneNumber("UZ", {
    message: "Noto‘g‘ri! Telefon raqam formati. (+998...)",
  })
  phone_number: string;
}
