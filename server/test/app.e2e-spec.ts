import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import Redis from 'ioredis';
import {
  makeRedisStore,
  makeSessionMiddleware,
} from 'src/common/middleware/session';
import { CustomLogger } from 'src/logger/custom.logger';
import request from 'supertest';
import { AppModule } from './../src/app.module';

Error.stackTraceLimit = Infinity;

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let redisClient: Redis;
  const logger = new CustomLogger();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const { redis, redisStore } = makeRedisStore();
    const sessionMiddleware = makeSessionMiddleware(redisStore);
    redisClient = redis;
    app.use(sessionMiddleware);

    app.useLogger(logger);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await redisClient.quit();
  });

  it('/ (GET)', async () => {
    logger.log('test');
    return request(app.getHttpServer()).get('/').expect(403);
  });
});
