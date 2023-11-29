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
      methods: 'GET ,HEAD, PUT, PATCH, POST, DELETE',
      allowedHeaders: 'Content-Type, Accept',
      credentials: true,
    },
  });

  app.use(morgan('dev'));

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
