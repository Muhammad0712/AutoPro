import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Contract } from "./models/contract.model";
import { CreateContractDto } from "./dto/create-contract.dto";
import { UpdateContractDto } from "./dto/update-contract.dto";
import { Request } from "express";

@Injectable()
export class ContractsService {
  constructor(
    @InjectModel(Contract)
    private readonly contractModel: typeof Contract
  ) {}

  async create(createContractDto: CreateContractDto) {
    const duplicate = await this.contractModel.findOne({
      where: {
        user_id: createContractDto.user_id,
        car_id: createContractDto.car_id,
      },
    });
    if (duplicate) {
      throw new ConflictException(
        "Bu foydalanuvchida bu avtomobil uchun allaqachon shartnoma mavjud"
      );
    }

    return this.contractModel.create(createContractDto);
  }

  async findAll() {
    const contracts = await this.contractModel.findAll({
      include: { all: true },
    });
    if (!contracts.length) {
      throw new NotFoundException("Shartnomalar topilmadi");
    }
    return contracts;
  }

  async findOne(id: number) {
    const contract = await this.contractModel.findByPk(id, {
      include: { all: true },
    });
    if (!contract) {
      throw new NotFoundException("Shartnoma topilmadi");
    }
    return contract;
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    const contract = await this.contractModel.findByPk(id);
    if (!contract) {
      throw new NotFoundException("Shartnoma mavjud emas");
    }

    await this.contractModel.update(updateContractDto, {
      where: { id },
    });

    return {
      message: "Shartnoma muvaffaqiyatli yangilandi",
    };
  }

  async remove(id: number) {
    const contract = await this.contractModel.findByPk(id);
    if (!contract) {
      throw new NotFoundException("Shartnoma topilmadi");
    }

    await this.contractModel.destroy({ where: { id } });

    return {
      message: "Shartnoma muvaffaqiyatli o'chirildi",
    };
  }

  async findAllCompanyContracts(id: number) {
    const contracts = await this.contractModel.findAll({
      where: {
        company_id: id,
      },
      include: {
        all: true,
      },
    });
    if (!contracts.length) {
      throw new NotFoundException("Hech qanday shartnoma topilmadi")
    }
    return contracts;
  }

  async findAllUserContracts(id: number) {
    const contracts = await this.contractModel.findAll({
      where: {
        user_id: id,
      },
      include: {
        all: true,
      },
    });
    if (!contracts.length) {
      throw new NotFoundException("Hech qanday shartnoma topilmadi");
    }
    return contracts;
  }
}
