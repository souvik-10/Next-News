import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { ENV } from '../config/env';

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Log unexpected errors
  if (statusCode === 500) {
    console.error('[Unhandled Error]:', err);
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    stack: ENV.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
