import { ApiProperty } from "@nestjs/swagger";
import {
    BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Contract } from "../../contracts/models/contract.model";

interface PaymentCreationAttrs {
  contract_id: number;
  amount: number;
}

@Table({ tableName: "payments", timestamps: false })
export class Payment extends Model<Payment, PaymentCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: "To‘lov ID raqami (unikal)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 3,
    description: "Shartnoma ID (contract_id)",
  })
  @ForeignKey(()=> Contract)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare contract_id: number;

  @ApiProperty({
    example: 180000000,
    description: "To‘lov miqdori (so‘m)",
  })
  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
  })
  declare amount: number;

  @BelongsTo(()=> Contract)
  contract: Contract;
}
