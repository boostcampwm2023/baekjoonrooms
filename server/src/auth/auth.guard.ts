import { AuthGuard } from '@nestjs/passport';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';

export class GithubAuthGuard extends AuthGuard('github') {
  private readonly logger = new Logger(GithubAuthGuard.name);

  constructor() {
    super();
    this.logger.debug('GithubAuthGuard constructor');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('GithubAuthGuard canActivate');

    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated();
    if (isAuthenticated) {
      this.logger.error(`Already logged in via session!`);
      return false;
    }

    this.logger.debug('isAuthenticated is ', isAuthenticated);
    this.logger.debug('Now we are redirecting to github login page...');

    const result = (await super.canActivate(context)) as boolean;
    this.logger.debug('super.canActivate result is ', result);

    if (result) {
      await super.logIn(request);
    }
    return result;
  }
}

export class MockAuthGuard extends AuthGuard('local') {
  private readonly logger = new Logger(MockAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('[start] MockAuthGuard canActivate');
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated();

    if (isAuthenticated) {
      this.logger.error('Already logged in via session!');
      throw new BadRequestException('Already logged in!');
    } else {
      this.logger.debug(
        'No record in session. Now we are logging in... with mock strategy',
      );
    }

    const result = (await super.canActivate(context)) as boolean;

    if (result) {
      this.logger.debug(`Now we ask passport to record this session...`);
      await super.logIn(request);
      this.logger.debug(`Session recording successful!`);
    } else {
      this.logger.fatal(`login failed!`);
    }
    return result;
  }
}

/**
 * return true if the user is authenticated. This is required for the session-based authentication.
 * /session의 경우 GithubAuthGuard를 사용하면 안된다.
 * GithubAuthGuard의 경우 실패 시 github login page로 redirect를 시도하는데, react에서 이를 따로 처리하지 않으면 오류가 발생한다.
 * /session api 로 단순히 json을 기대하는 사용자 입장에서는 곤혹스럽다.
 */
export class SessionAuthGuard implements CanActivate {
  private readonly logger = new Logger(SessionAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('start canActivate');
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated();
    this.logger.debug(`isAuthenticated is ${isAuthenticated}`);
    return request.isAuthenticated();
  }
}
