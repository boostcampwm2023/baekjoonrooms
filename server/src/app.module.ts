import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { SocketModule } from './socket/socket.module';

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
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
