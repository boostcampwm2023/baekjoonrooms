import { ValidationPipe } from '@nestjs/common';

export const globalValidationPipe = () => {
  const pipe = new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    disableErrorMessages: false, // production 환경에서는 보통 true로 설정
  });

  return {
    provide: 'APP_PIPE',
    useValue: pipe,
  };
};
