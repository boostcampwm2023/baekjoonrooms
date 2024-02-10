import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import cookieParser from 'cookie-parser';
import express from 'express';
import passport from 'passport';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { provideGlobalExceptionFilter } from './common/exception.filter.provider';
import { globalValidationPipe as provideGlobalValidationPipe } from './common/validation.pipe';
import { LoggerModule } from './logger/logger.module';
import { ProblemModule } from './problem/problem.module';
import { RoomUserModule } from './room-user/room-user.module';
import { RoomModule } from './room/room.module';
import { SocketModule } from './socket/socket.module';
import { SubmissionModule } from './submission/submission.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.*'],
      logging: true,
      synchronize: true, // production시 false로 변경
      namingStrategy: new SnakeNamingStrategy(),
    }),
    AuthModule,
    UserModule,
    SocketModule,
    RoomModule,
    ProblemModule,
    SubmissionModule,
    RoomUserModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    provideGlobalValidationPipe(),
    provideGlobalExceptionFilter(),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');

    // passport
    consumer
      .apply(express.json())
      .forRoutes('*')
      .apply(passport.initialize())
      .forRoutes('*')
      .apply(passport.session())
      .forRoutes('*');
  }
}
