import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import passport from 'passport';

type Socket = {
  request: Request;
};

export class SocketIOAdapter extends IoAdapter {
  private readonly session: RequestHandler;
  constructor(session: RequestHandler, app: INestApplicationContext) {
    super(app);
    this.session = session;
  }

  create(port: number, options?: any): any {
    const server = super.createIOServer(port, options);

    const wrap =
      (middleware: RequestHandler) => (socket: Socket, next: NextFunction) =>
        middleware(socket.request, {} as Response, next);

    server.use(wrap(this.session));
    server.use(wrap(passport.initialize() as RequestHandler));
    server.use(wrap(passport.session() as RequestHandler));

    return server;
  }
}
