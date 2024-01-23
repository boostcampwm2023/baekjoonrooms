import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { ShortLoggerService } from './short-logger/short-logger.service';
import { ExceptionsFilter } from './exceptions/exceptions.filter';
import { SocketIOAdapter } from './socket/socket.adapter';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
      allowedHeaders: 'Content-Type, Accept',
      credentials: true,
    },
  });

  app.useLogger(new ShortLoggerService());

  morganSetup(app);

  app.use(cookieParser());

  const REDIS_HOST = process.env.REDIS_HOSTNAME;
  if (REDIS_HOST == null) throw new Error('REDIS_HOST is not defined');

  const redis = new Redis({
    host: REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? '6379'),
  });

  const redisStore = new RedisStore({
    client: redis,
    prefix: 'baekjoonrooms:',
  });

  const sessionMiddleware = session({
    secret: 'example-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
    store: redisStore,
  });

  app.use(sessionMiddleware);

  app.use(passport.initialize());
  app.use(passport.session());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false, // production 환경에서는 보통 true로 설정
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('bojrooms API Docs')
    .setDescription('bojrooms API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.useWebSocketAdapter(new SocketIOAdapter(sessionMiddleware, app));

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
