import { GithubAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new GithubAuthGuard()).toBeDefined();
  });
});
