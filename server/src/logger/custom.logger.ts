import { ConsoleLogger, LogLevel } from '@nestjs/common';

// @Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends ConsoleLogger {
  protected getTimestamp(): string {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${month}${date} ${hours}:${minutes}:${seconds}`;
  }

  protected formatPid(): string {
    return '';
  }

  protected formatContext(context: string): string {
    return super.formatContext(context.substring(0, 10));
  }

  protected formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string,
  ): string {
    return super.formatMessage(
      logLevel,
      message,
      pidMessage,
      (logLevel as string).toUpperCase().substring(0, 3),
      contextMessage,
      timestampDiff,
    );
  }
}
