import { ApiProperty } from "@nestjs/swagger";
import {
    BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { Company } from "../../companies/models/company.model";
import { Brand } from "../../brands/models/brand.model";
import { CarModel } from "../../car_models/models/car_model.mode";
import { Colour } from "../../colours/models/colour.model";
import { CarColour } from "../../car_colours/models/car_colour.model";
import { Contract } from "../../contracts/models/contract.model";

interface ICarCreationAttrs {
  position: number;
  car_year: number;
  acceleration: number;
  fuel_consumption: number;
  horse_power: number;
  transmission_step: number;
  price: number;
  image_path: string;
  model_id: number;
  brand_id: number;
  company_id: number;
  count: number;
}

@Table({ tableName: "cars", timestamps: false })
export class Car extends Model<Car, ICarCreationAttrs> {
  @ApiProperty({ example: 1, description: "Avtomobilning unikal ID raqami" })
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({
    example: 1,
    description: "Ro'yxatdagi avtomobilning tartib raqami (pozitsiyasi)",
  })
  @Column({ type: DataType.SMALLINT })
  declare position: number;

  @ApiProperty({
    example: 2022,
    description: "Avtomobil ishlab chiqarilgan yil",
  })
  @Column({ type: DataType.SMALLINT })
  declare car_year: number;

  @ApiProperty({
    example: 9.8,
    description: "Avtomobilning 0 dan 100 km/h gacha tezlashish vaqti (sekund)",
  })
  @Column({ type: DataType.DECIMAL })
  declare acceleration: number;

  @ApiProperty({ example: 6.5, description: "Yonilg'i sarfi (litr/100 km)" })
  @Column({ type: DataType.DECIMAL })
  declare fuel_consumption: number;

  @ApiProperty({ example: 150, description: "Avtomobilning ot kuchi" })
  @Column({ type: DataType.SMALLINT })
  declare horse_power: number;

  @ApiProperty({ example: 6, description: "Uzatmalar qadamlar soni" })
  @Column({ type: DataType.SMALLINT })
  declare transmission_step: number;

  @ApiProperty({ example: 180000000, description: "Avtomobil narxi (so'mda)" })
  @Column({ type: DataType.BIGINT })
  declare price: number;

  @ApiProperty({
    example: "/images/cobalt.png",
    description: "Avtomobil rasmining fayl yo‘li",
  })
  @Column({ type: DataType.STRING })
  declare image_path: string;

  @ApiProperty({
    example: 1,
    description: "Model identifikatori (string formatda)",
  })
  @ForeignKey(() => CarModel)
  @Column({ type: DataType.INTEGER })
  declare model_id: number;

  @ApiProperty({
    example: 1,
    description: "Brend identifikatori (string formatda)",
  })
  @ForeignKey(() => Brand)
  @Column({ type: DataType.INTEGER })
  declare brand_id: number;

  @ApiProperty({
    example: 1,
    description: "Avtomobil qaysi kompaniyaga tegishli ekanligi (company ID)",
  })
  @ForeignKey(() => Company)
  @Column({ type: DataType.BIGINT })
  declare company_id: number;

  @ApiProperty({
    example: 10,
    description: "Ombordagi ushbu modeldagi avtomobillar soni",
  })
  @Column({ type: DataType.BIGINT })
  declare count: number;

  @BelongsTo(()=> CarModel)
  carModel: CarModel;

  @BelongsTo(()=> Brand)
  brand: Brand;

  @BelongsTo(()=> Company)
  company: Company;

  @BelongsToMany(()=> Colour, ()=> CarColour)
  colours: Colour[];

  @HasOne(()=> Contract)
  contract: Contract;
}
