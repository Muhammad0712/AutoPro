import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, Matches } from "class-validator";

export class CreateCompanyDto {
  @ApiProperty({
    example: "General Motors",
    description: "Bu yerga avtomobil sotuvchi tashkilot nomi kiritiladi",
  })
  @IsNotEmpty({ message: "Iltimos campaniya nomini kiriting!" })
  company_name: string;

  @ApiProperty({
    example: "Muhammad",
    description: "Bu yerga companiya direktori ismi kiritiladi!",
  })
  @IsNotEmpty({ message: "Iltimos campaniya direktori ismini kiriting!" })
  director_first_name: string;

  @ApiProperty({
    example: "Nematullayev",
    description: "Bu yerga companiya direktori familyasi kiritiladi!",
  })
  @IsNotEmpty({ message: "Iltimos campaniya direktori familyasini kiriting!" })
  director_last_name: string;

  @ApiProperty({
    example: "example@gmail.com",
    description: "Bu yerga companiya emaili kiritiladi!",
  })
  @IsNotEmpty({ message: "Iltimos campaniya emailini kiriting!" })
  @IsEmail({}, { message: "Iltimos emailni to'g'ri formatda kiriting!" })
  email: string;

  @ApiProperty({
    example: "Example0000",
    description: "Bu yerga parol kiritiladi!",
  })
  @IsNotEmpty({ message: "Iltimos parolni kiriting!" })
  @Matches(/^(?=.*\d).{8,}$/, {
    message:
      "Parol kamida 8 ta belgidan iborat bo‘lishi va kamida 1 ta raqam bo‘lishi kerak!",
  })
  password: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Bu yerga companiya telefon raqami kiritiladi!",
  })
  @IsNotEmpty({ message: "Iltimos companiya telefon raqamini kiriting!" })
  @IsPhoneNumber("UZ", {
    message: "Noto‘g‘ri telefon raqam formati. (+998...)",
  })
  phone_number: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Bu yerga qo'shimcha telefon raqam kiritiladi!",
  })
  @IsNotEmpty({ message: "Iltimos qo'shimcha telefon raqamni kiriting!" })
  @IsPhoneNumber("UZ", {
    message: "Noto‘g‘ri telefon raqam formati. (+998...)",
  })
  additional_phone_number: string;

  @ApiProperty({
    example:
      "Toshkent shahar, Mirzo Ulug'bek tuman, Ulug'bek Shaharchasi, Xuroson 3-tor, 14-B",
    description: "Bu yerga companiya manzili kiritiladi!",
  })
  @IsNotEmpty({ message: "Iltimos companiya manzilini kiriting kiriting!" })
  address: string;

  @ApiProperty({
    example: "path",
    description: "Bu yerga companiya xaritada onlayn joylashuvi kiritiladi!",
  })
  @IsNotEmpty({ message: "Iltimos companiya joylashuvini kiriting kiriting!" })
  location: string;

  @ApiProperty({
    example: "Toshkent",
    description: "Bu yerga companiya qaysi viloyatdaligi kiritiladi!",
  })
  @IsNotEmpty({ message: "Iltimos companiya joylashgan viloyatni kiriting!" })
  region_id: number;
}
