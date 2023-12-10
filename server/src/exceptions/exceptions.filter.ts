import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ForbiddenException,
  HttpException,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import * as util from 'util';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const { name, message, stack } = exception;
      if (
        exception instanceof BadRequestException ||
        exception instanceof ForbiddenException
      ) {
        this.logger.warn(`Server raises ${name}: ${status}: ${message}`, stack);
      } else {
        this.logger.error(
          `Server raises HttpException ${name}: ${status}: ${message}`,
          stack,
        );
      }
    } else if (exception instanceof Error) {
      const { name, message, stack } = exception;
      this.logger.error(`Server raises Error ${name}: ${message}`, stack);
    } else {
      this.logger.error(`Server raises an unknown exception...`);
      this.logger.error(util.inspect(exception));
    }

    super.catch(exception, host);
  }
}
