import { Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get<string>("SMTP_HOST"),
          secure: false,
          auth: {
            user: config.get<string>("SMTP_USER"),
            pass: config.get<string>("SMTP_PASSWORD"),
          },
        },
        defaults: {
          from: `CV_MAKER ${config.get<string>("SMTP_HOST")}`,
        },
        template: {
          dir: join(process.cwd(), "src/mail/templates"),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
