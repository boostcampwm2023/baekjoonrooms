import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import { AppModule } from './app.module';
import {
  makeRedisStore,
  makeSessionMiddleware,
} from './common/middleware/session';
import { CustomLogger } from './logger/custom.logger';
import { SocketIOAdapter } from './socket/socket.adapter';

Error.stackTraceLimit = Infinity;
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
      allowedHeaders: 'Content-Type, Accept',
      credentials: true,
    },
    bufferLogs: false,
  });

  app.useLogger(app.get(CustomLogger));

  morganSetup(app);

  const { redisStore } = makeRedisStore();
  const sessionMiddleware = makeSessionMiddleware(redisStore);

  app.use(sessionMiddleware);
  app.useWebSocketAdapter(new SocketIOAdapter(sessionMiddleware, app));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('bojrooms API Docs')
    .setDescription('bojrooms API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);
}

bootstrap();

function morganSetup(app) {
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
}
