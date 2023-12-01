import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule, utilities } from 'nest-winston';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as winston from 'winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProblemModule } from './problem/problem.module';
import { RoomModule } from './room/room.module';
import { SocketModule } from './socket/socket.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOSTNAME,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.*'],
      logging: true,
      synchronize: true, // production시 false로 변경
      namingStrategy: new SnakeNamingStrategy(),
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.timestamp(),
            winston.format.splat(),
            winston.format.ms(),
            utilities.format.nestLike('BJRM', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),

    AuthModule,
    UserModule,
    SocketModule,
    RoomModule,
    ProblemModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
