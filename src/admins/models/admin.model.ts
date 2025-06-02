import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

@Table({ tableName: "admins", timestamps: false })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Admin unkal id raqami",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Muhammad",
    description: "Bu yerga admin ismi kiritiladi",
  })
  @Column({
    type: DataType.STRING,
  })
  declare first_name: string;

  @ApiProperty({
    example: "Nematilloyev",
    description: "Bu yerga admin ismi kiritiladi",
  })
  @Column({
    type: DataType.STRING,
  })
  declare last_name: string;

  @ApiProperty({
    example: "example@gmail.com",
    description: "Bu yerga admin email pochtasi kiritiladi",
  })
  @Column({
    type: DataType.STRING,
    unique: true
  })
  declare email: string;

  @ApiProperty({
    example: "Example0000!@#",
    description: "Bu yerga admin paroli kiritiladi",
  })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({
    example: true,
    description:
      "Bu yerga admin roli kiritiladi. Super bo'lsa true, admin bo'lsa false",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  declare is_creator: boolean;

  @ApiProperty({
    example: true,
    description: "Bu yerga admin holati kiritiladi",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: true,
  })
  declare is_active: boolean;

  @ApiProperty({
    example: "qwerty",
    description: "Bu yerga admin refresh kiritiladi",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: "",
  })
  declare refresh_token: string;
}
