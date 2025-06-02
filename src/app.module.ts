import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AdminsModule } from "./admins/admins.module";
import { Admin } from "./admins/models/admin.model";
import { AuthModule } from "./auth/auth.module";
import { CompaniesModule } from "./companies/companies.module";
import { RegionsModule } from "./regions/regions.module";
import { BrandsModule } from "./brands/brands.module";
import { Company } from "./companies/models/company.model";
import { Region } from "./regions/models/region.model";
import { Brand } from "./brands/models/brand.model";
import { CarModelsModule } from "./car_models/car_models.module";
import { CarModel } from "./car_models/models/car_model.mode";
import { CarsModule } from "./cars/cars.module";
import { Car } from "./cars/models/car.model";
import { ColoursModule } from "./colours/colours.module";
import { CarColoursModule } from "./car_colours/car_colours.module";
import { Colour } from "./colours/models/colour.model";
import { CarColour } from "./car_colours/models/car_colour.model";
import { ContractsModule } from './contracts/contracts.module';
import { Contract } from "./contracts/models/contract.model";
import { PaymentsModule } from './payments/payments.module';
import { Payment } from "./payments/models/payment.model";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        Admin,
        Company,
        Region,
        Brand,
        CarModel,
        Car,
        Colour,
        CarColour,
        Contract,
        Payment
      ],
      autoLoadModels: true,
      logging: false,
      sync: { alter: true },
    }),
    UsersModule,
    AdminsModule,
    AuthModule,
    CompaniesModule,
    RegionsModule,
    BrandsModule,
    CarModelsModule,
    CarsModule,
    ColoursModule,
    CarColoursModule,
    ContractsModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
