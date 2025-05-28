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

@Module({
  imports: [
    SequelizeModule.forFeature([User, Admin]),
    JwtModule.register({ global: true }),
    UsersModule,
    AdminsModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [UserAuthService],
})
export class AuthModule {}
