import { INestApplication } from '@nestjs/common';
import morgan from 'morgan';

export const morganSetup = (app: INestApplication) => {
  morgan.token('status-message', (req, res) => {
    return res.statusMessage;
  });

  morgan.token('formatted-date', () => {
    const date = new Date();
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  });

  app.use(
    morgan(
      '\n-->>> [:formatted-date] :remote-addr :remote-user ":method :url HTTP/:http-version"',
      {
        immediate: true,
      },
    ),
  );
  app.use(
    morgan(
      '<<<-- [:formatted-date] :status :status-message :response-time :res[content-length]',
      {
        immediate: false,
      },
    ),
  );
};
