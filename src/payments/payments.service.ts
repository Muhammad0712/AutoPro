import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";
import { Contract } from "../contracts/models/contract.model";

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
    return {
      message: "Bu metodga murojaat etib bo'lmaydi!",
    };
    const affectedCount = await this.paymentModel.update(updatePaymentDto, {
      where: { id },
    });
    if (!affectedCount) {
      throw new NotFoundException("Bunday to'lov topilmadi!");
    }

    return;
  }

  async remove(id: number) {
    return {
      message: "Bu metodga murojaat etib bo'lmaydi!",
    };
    const deletedCount = await this.paymentModel.destroy({ where: { id } });
    if (!deletedCount) {
      throw new NotFoundException("Bunday to'lov topilmadi!");
    }
    return {
      message: "To'lov muvaffatiyatli o'chirildi!",
    };
  }

  async getMyPayments(id: number) {
    const myPayments = await this.paymentModel.findAll({
      include: {
        model: Contract,
        where: { user_id: id },
        attributes: [],
      },
    });
    if (!myPayments.length) {
      throw new NotFoundException("Hech qanday to'lov mavjud emas!");
    }
    return myPayments;
  }

  async getCompanyPayments(id: number) {
    const companyPayments = await this.paymentModel.findAll({
      include: {
        model: Contract,
        where: { company_id: id },
        attributes: [],
      },
    });
    if (!companyPayments.length) {
      throw new NotFoundException("Hech qanday to'lov mavjud emas!");
    }
    return companyPayments;
  }
}
