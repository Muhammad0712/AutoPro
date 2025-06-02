import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Car } from "../../cars/models/car.model";
import { CarColour } from "../../car_colours/models/car_colour.model";

interface IColourCreationAttrs {
  name: string;
  code: string;
}

@Table({ tableName: "colours", timestamps: false })
export class Colour extends Model<Colour, IColourCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: "Rangning unikal ID raqami",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Qora",
    description: "Rang nomi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ApiProperty({
    example: "#000000",
    description: "Rang kodi (hex formatda)",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare code: string;

  @BelongsToMany(()=> Car, ()=> CarColour)
  cars: Car[];
}
