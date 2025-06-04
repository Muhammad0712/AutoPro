import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { timestamp } from "rxjs";

@Catch()
export class AllExeptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExeptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(`Status: ${status} Error: ${exception}`);

    response.status(status).json({
      statusCode: status,
      message: exception,
      timestamp: new Date().toISOString,
      path: request.url,
    });
  }
}
