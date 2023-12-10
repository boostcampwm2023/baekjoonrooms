import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  private readonly logger = new Logger(WebsocketExceptionsFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof Error) {
      const { name, message, stack } = exception;

      this.logger.error(
        `IO server raises ${name}: Error Message: ${message}`,
        stack,
      );
    } else {
      this.logger.error(`Server caught unknown type`, exception);
    }
    super.catch(exception, host);
  }
}
