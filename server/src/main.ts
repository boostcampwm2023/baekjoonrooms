import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:5173',
      methods: 'GET ,HEAD, PUT, PATCH, POST, DELETE',
      allowedHeaders: 'Content-Type, Accept',
      credentials: true,
    },
  });

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
