import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { User } from "../users/models/user.model";
import { Admin } from "../admins/models/admin.model";
import { Company } from "../companies/models/company.model";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailUser(user: User) {
    const url = `${process.env.API_HOST}/api/auth/users/activate/${user.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welcome to AutoPro",
      template: "confirmation",
      context: {
        name: user.first_name,
        url,
      },
    });
  }

  async sendMailCompany(company: Company) {
    const url = `${process.env.API_HOST}/api/auth/companies/activate/${company.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: company.email,
      subject: "Welcome to AutoPro",
      template: "confirmation",
      context: {
        name: company.director_first_name,
        url,
      },
    });
  }
}
