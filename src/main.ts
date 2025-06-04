import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConsoleLogger, InternalServerErrorException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./common/logger/winston.logger";
import { AllExeptionFilter } from "./common/errors/error.handling";

async function start() {
  try {
    const PORT = process.env.PORT || 3001;
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig),
    });
    

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");
    app.use(cookieParser());

    const config = new DocumentBuilder()
      .setTitle("AutPro project")
      .setDescription("NestJs Api")
      .setVersion("1.0")
      .addTag("Swagger, Validation, Identiphication, Authentiphication, Authorization, ErrorHandling")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);
    
    app.useGlobalFilters(new AllExeptionFilter());
    await app.listen(PORT, () => {
      console.log(`Server started at ${PORT} - port!`);
    });
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException("Something went wrong");
  }
}
start();
