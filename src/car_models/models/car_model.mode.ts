import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Brand } from "../../brands/models/brand.model";
import { Car } from "../../cars/models/car.model";

interface ICarModelCreationAttr{
    name: string;
    brandId: number;
}

@Table({ tableName: "car_models", timestamps: false })
export class CarModel extends Model<CarModel, ICarModelCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Avtomobil modeli unikal id raqami",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Cobalt",
    description: "Automobil modeli nomi",
  })
  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @ApiProperty({
    example: 1,
    description: "Qaysi brandga tegishli ekanligi.",
  })
  @ForeignKey(()=> Brand)
  @Column({
    type: DataType.INTEGER,
  })
  declare brandId: number;

  @BelongsTo(()=> Brand)
  brand: Brand;

  @HasMany(()=> Car)
  cars: Car[];
}
