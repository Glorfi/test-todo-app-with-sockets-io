import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useUniqueId = () => {
  const randomString = Math.random().toString(36).substr(2, 9);
  const timestamp = Date.now().toString(36);
  const uniqueId = timestamp + randomString;

  return uniqueId;
};
