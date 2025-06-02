import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Contract } from "../../contracts/models/contract.model";

interface IUserCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
}

@Table({ tableName: "users", timestamps: false })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchining unikal id raqami",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Muhammad",
    description: "Foydalanuvchi ismi",
  })
  @Column({
    type: DataType.STRING,
  })
  declare first_name: string;

  @ApiProperty({
    example: "Nematilloyev",
    description: "Foydalanuvchi familyasi!",
  })
  @Column({
    type: DataType.STRING,
  })
  declare last_name: string;

  @ApiProperty({
    example: "example@gmail.com",
    description: "Foydalanuvchi email pochtasi",
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @ApiProperty({
    example: "Example0000",
    description: "Foydalanuvchi paroli",
  })
  @Column({
    type: DataType.STRING,
  })
  declare password: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Foydalanuvchi telefon raqami",
  })
  @Column({
    type: DataType.STRING,
    unique: true
  })
  declare phone_number: string;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchi holati active yoki active emas",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @ApiProperty({
    example: "qwerty",
    description: "Foydalanuvchini aktivlashtirish linki",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @ApiProperty({
    example: "qwerty-qwerty",
    description: "Foydalanuvchi refresh tokeni",
  })
  @Column({
    type: DataType.TEXT,
    defaultValue: "",
  })
  declare refresh_token: string;

  @HasMany(()=> Contract)
  contracts: Contract[];
}
