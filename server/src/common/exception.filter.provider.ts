import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/common/exception.filter';

export const provideGlobalExceptionFilter = () => {
  return {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter,
  };
};
