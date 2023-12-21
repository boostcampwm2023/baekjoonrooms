import { useContext } from 'react';
import {
  LocalStorageContextValue,
  LocalStorageContext,
} from './LocalStorageProvider';

export const useLocalStorage = (): LocalStorageContextValue => {
  const context = useContext(LocalStorageContext);
  if (!context) {
    throw new Error(
      'useLocalStorage must be used within a LocalStorageProvider',
    );
  }
  return context;
};
