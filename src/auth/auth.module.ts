import { Module } from "@nestjs/common";
import { UserAuthService } from "./user.auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { AdminsModule } from "../admins/admins.module";
import { UsersModule } from "../users/users.module";
import { MailModule } from "../mail/mail.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/models/user.model";
import { Admin } from "../admins/models/admin.model";
import { AdminAuthService } from "./admin.auth.service";
import { CompanyAuthService } from "./company.auth.service";
import { Company } from "../companies/models/company.model";
import { CompaniesModule } from "../companies/companies.module";

@Module({
  imports: [
    SequelizeModule.forFeature([User, Admin, Company]),
    JwtModule.register({ global: true }),
    UsersModule,
    AdminsModule,
    MailModule,
    CompaniesModule
  ],
  controllers: [AuthController],
  providers: [UserAuthService, AdminAuthService, CompanyAuthService],
})
export class AuthModule {}
