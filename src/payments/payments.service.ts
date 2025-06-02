import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment
  ) {}
  create(createPaymentDto: CreatePaymentDto) {
    this.paymentModel.create(createPaymentDto);
  }

  async findAll() {
    const payments = await this.paymentModel.findAll({
      include: { all: true },
    });
    if (!payments.length) {
      throw new NotFoundException("Hech qanday to'lov topilmadi!");
    }
    return payments;
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id, {
      include: { all: true },
    });
    if (!payment) {
      throw new NotFoundException("Bunday to'lov topilmadi!");
    }
    return;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const affectedCount = await this.paymentModel.update(updatePaymentDto, {
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException("Bunday to'lov topilmadi!");
    }

    return;
  }

  async remove(id: number) {
    const deletedCount = await this.paymentModel.destroy({ where: { id } });
    if (!deletedCount) {
      throw new NotFoundException("Bunday to'lov topilmadi!")
    }
    return {
      message: "To'lov muvaffatiyatli o'chirildi!"
    }
  }
}
