import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICompanyCreationAttr {
  company_name: string;
  director_first_name: string;
  director_last_name: string;
  email: string;
  password: string;
  phone_number: string;
  additional_phone_number: string;
  address: string;
  location: string;
  region_id: number;
}

@Table({ tableName: "companies", timestamps: false })
export class Company extends Model<Company, ICompanyCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Companiya unikal id raqami!",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "General Motors",
    description: "Bu yerga avtomobil sotuvchi tashkilot nomi kiritiladi",
  })
  @Column({
    type: DataType.STRING(30),
  })
  declare company_name: string;

  @ApiProperty({
    example: "Muhammad",
    description: "Bu yerga companiya direktori ismi kiritiladi!",
  })
  @Column({
    type: DataType.STRING(30),
  })
  declare director_first_name: string;

  @ApiProperty({
    example: "Nematullayev",
    description: "Bu yerga companiya direktori familyasi kiritiladi!",
  })
  @Column({
    type: DataType.STRING(30),
  })
  declare director_last_name: string;

  @ApiProperty({
    example: "example@gmail.com",
    description: "Bu yerga companiya emaili kiritiladi!",
  })
  @Column({
    type: DataType.STRING,
    unique: true
  })
  declare email: string;

  @ApiProperty({
    example: "Example0000",
    description: "Bu yerga parol kiritiladi!",
  })
  @Column({
    type: DataType.STRING(30),
  })
  declare password: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Bu yerga companiya telefon raqami kiritiladi!",
  })
  @Column({
    type: DataType.STRING(30),
    unique: true
  })
  declare phone_number: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Bu yerga qo'shimcha telefon raqam kiritiladi!",
  })
  @Column({
    type: DataType.STRING(30),
    unique: true
  })
  declare additional_phone_number: string;

  @ApiProperty({
    example:
      "Toshkent shahar, Mirzo Ulug'bek tuman, Ulug'bek Shaharchasi, Xuroson 3-tor, 14-B",
    description: "Bu yerga companiya manzili kiritiladi!",
  })
  @Column({
    type: DataType.STRING,
  })
  declare address: string;

  @ApiProperty({
    example: "path",
    description: "Bu yerga companiya xaritada onlayn joylashuvi kiritiladi!",
  })
  @Column({
    type: DataType.STRING,
  })
  declare location: string;

  @ApiProperty({
    example: "link",
    description: "Bu yerga companiya aktivlashtirish linki kiritiladi!",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @ApiProperty({
    example: true,
    description:
      "Bu yerga companiya holati (aktiv yoki aktiv emas) kiritiladi!",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @ApiProperty({
    example: "token",
    description: "Bu yerga companiya refresh tokeni kiritiladi!",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: "",
  })
  declare refresh_token: string;

  @ApiProperty({
    example: "Toshkent",
    description: "Bu yerga companiya qaysi viloyatdaligi kiritiladi!",
  })
  @Column({
    type: DataType.STRING,
  })
  declare region_id: number;
}
