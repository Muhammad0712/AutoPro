import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Colour } from "../../colours/models/colour.model";
import { Car } from "../../cars/models/car.model";

interface ICarColourCreationAttr {
  car_id: number;
  colour_id: number;
  count: number;
}

@Table({ tableName: "car_colours", timestamps: false })
export class CarColour extends Model<CarColour, ICarColourCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: 3,
    description: "Car jadvalidagi ID (qaysi avtomobil)",
  })
  @ForeignKey(()=> Car)
  @Column({
    type: DataType.INTEGER,
  })
  declare car_id: number;

  @ApiProperty({
    example: 2,
    description: "Colour jadvalidagi ID (qaysi rang)",
  })
  @ForeignKey(()=> Colour)
  @Column({
    type: DataType.INTEGER,
  })
  declare colour_id: number;

  @ApiProperty({
    example: 15,
    description: "Shu rangdagi avtomobil soni",
  })
  @Column({
    type: DataType.INTEGER,
    defaultValue: 1
  })
  declare count: number;

  @BelongsTo(()=> Car)
  car: Car;

  @BelongsTo(()=> Colour)
  colour: Colour;
}
