import RedisStore from 'connect-redis';
import session from 'express-session';
import Redis from 'ioredis';

export const makeRedisStore = () => {
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
  return { redis, redisStore };
};

export const makeSessionMiddleware = (redisStore: RedisStore) => {
  const sessionMiddleware = session({
    secret: 'example-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
    store: redisStore,
  });
  return sessionMiddleware;
};
