import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Company } from "../../companies/models/company.model";

interface IRegionCreationAttr{
    name: string;
}

@Table({ tableName: "regions", timestamps: false })
export class Region extends Model<Region, IRegionCreationAttr> {

  @ApiProperty({
    example: 1,
    description: "Bu Viloyatning unikal id raqami!",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare id: number;

  @ApiProperty({
    example: "Toshkent",
    description: "Bu yerga viloyat nomi kiritiladi!",
  })
  @Column({
    type: DataType.STRING,
    unique: true
  })
  declare name: string;

  @HasMany(()=> Company)
  companies: Company[];
}
