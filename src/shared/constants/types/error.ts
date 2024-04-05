import { SerializedError } from '@reduxjs/toolkit/react';

export interface ICustomError extends SerializedError {
  success: string;
  error: string;
}
