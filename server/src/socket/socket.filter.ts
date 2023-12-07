import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  private readonly logger = new Logger(WebsocketExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.debug('this exception is handled by WebsocketExceptionsFilter');
    super.catch(exception, host);
  }
}
