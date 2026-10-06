import { Request, Response, NextFunction } from 'express';

export const getWatchlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success', message: 'getWatchlist endpoint foundation' });
  } catch (error) {
    next(error);
  }
};

export const addToWatchlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({ status: 'success', message: 'addToWatchlist endpoint foundation' });
  } catch (error) {
    next(error);
  }
};

export const removeFromWatchlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success', message: 'removeFromWatchlist endpoint foundation' });
  } catch (error) {
    next(error);
  }
};
