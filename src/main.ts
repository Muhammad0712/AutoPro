import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from "cookie-parser";

async function start() {
  try {
    const PORT = process.env.PORT || 3001;
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");
    app.use(cookieParser());

    const config = new DocumentBuilder()
      .setTitle("Skidkachi project")
      .setDescription("NestJs Api")
      .setVersion("1.0")
      .addTag("Swagger, Validation, Send email, Bot, Tokens")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    await app.listen(PORT, () => {
      console.log(`Server started at ${PORT} - port!`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
