import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:5173',
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      allowedHeaders: 'Content-Type, Accept',
      credentials: true,
    },
  });

  morganSetup(app);

  app.use(cookieParser());

  app.use(
    session({
      secret: 'example-session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

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
      hour12: true,
    });
  });

  app.use(
    morgan(
      '-->>> [:formatted-date] :remote-addr :remote-user ":method :url HTTP/:http-version"',
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