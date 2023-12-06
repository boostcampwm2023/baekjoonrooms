import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const { name, message, stack } = exception;

      this.logger.error(
        `Server raises ${name}: ${status} Error Message: ${message}`,
        stack,
      );
    }

    super.catch(exception, host);
  }
}
