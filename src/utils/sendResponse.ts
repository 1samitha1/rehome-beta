import { Response } from 'express';
import { ApiResponse } from '../types/api-response';

export function sendResponse<T>(
  res: Response,
  status: number,
  result: T | null,
  success = true
): Response<ApiResponse<T>> {
  return res.status(status).json({
    success,
    result,
    status,
  });
}