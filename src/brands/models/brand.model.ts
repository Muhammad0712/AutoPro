import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { CarModel } from "../../car_models/models/car_model.mode";
import { Car } from "../../cars/models/car.model";

interface IBrandCreationAttr {
  name: string;
}

@Table({ tableName: "brands", timestamps: false })
export class Brand extends Model<Brand, IBrandCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "Bu brendning unikal id raqami!",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Muhammad",
    description: "Bu yerga brand nomi kiritiladi",
  })
  @Column({
    type: DataType.STRING(30)
  })
  declare name: string;

  @HasMany(()=> CarModel)
  carModels: CarModel[];

  @HasMany(()=> Car)
  cars: Car[];
}
