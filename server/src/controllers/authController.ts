import { Request, Response, NextFunction } from 'express';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({ status: 'success', message: 'register endpoint foundation' });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success', message: 'login endpoint foundation' });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success', message: 'getMe endpoint foundation' });
  } catch (error) {
    next(error);
  }
};
