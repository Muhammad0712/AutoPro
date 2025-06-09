import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from "class-validator";

export class UpdatePasswordDto {
  @ApiProperty({
    example: "Example0000",
    description: "Foydalanuvchining eski paroli",
  })
  @IsNotEmpty({ message: "Iltimos eski parolingizni kiriting" })
  old_password: string;

  @ApiProperty({
    example: "Example0000",
    description: "Foydalanuvchining eski paroli",
  })
  @IsNotEmpty({ message: "Iltimos parolingizni kiriting" })
  @Matches(/^(?=.*\d).{8,}$/, {
    message:
      "Parol kamida 8 ta belgidan iborat bo‘lishi va kamida 1 ta raqam bo‘lishi kerak!1",
  })
  new_password: string;

  @ApiProperty({
    example: "Example0000",
    description: "Foydalanuvchining yangi parolini tasdiqlash",
  })
  @IsNotEmpty({ message: "Iltimos parolingizni qayta kiriting" })
  confirm_password: string;
}
