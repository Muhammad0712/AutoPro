import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Car } from "../../cars/models/car.model";
import { Company } from "../../companies/models/company.model";
import { User } from "../../users/models/user.model";
import { Payment } from "../../payments/models/payment.model";

interface ContractCreationAttrs {
  term: number;
  car_id: number;
  company_id: number;
  user_id: number;
  payment_type: string;
  created_at: Date;
  status: boolean;
}

@Table({ tableName: "contracts", timestamps: false })
export class Contract extends Model<Contract, ContractCreationAttrs> {
  @ApiProperty({ example: 1, description: "Shartnoma ID raqami" })
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({ example: 12, description: "Shartnoma muddati (oylarda)" })
  @Column({
    type: DataType.SMALLINT,
  })
  declare term: number;

  @ApiProperty({ example: 3, description: "Avtomobil ID raqami" })
  @ForeignKey(()=> Car)
  @Column({
    type: DataType.SMALLINT,
  })
  declare car_id: number;

  @ApiProperty({ example: 2, description: "Kompaniya ID raqami" })
  @ForeignKey(()=> Company)
  @Column({
    type: DataType.SMALLINT,
  })
  declare company_id: number;

  @ApiProperty({ example: 101, description: "Foydalanuvchi ID raqami" })
  @ForeignKey(()=> User)
  @Column({
    type: DataType.BIGINT,
  })
  declare user_id: number;

  @ApiProperty({ example: "cash", description: "To'lov turi (enum)" })
  @Column({
    type: DataType.ENUM("cash", "card"),
  })
  declare payment_type: string;

  @ApiProperty({
    example: "2025-05-31",
    description: "Shartnoma tuzilgan sana",
  })
  @Column({
    type: DataType.DATE,
  })
  declare created_at: Date;

  @ApiProperty({
    example: true,
    description: "Shartnoma holati (faol yoki yo‘q)",
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  declare status: boolean;

  @BelongsTo(()=> Car)
  car: Car;

  @BelongsTo(()=> Company)
  company: Company;

  @BelongsTo(()=> User)
  user: User;

  @HasMany(()=> Payment)
  payments: Payment[];
}
