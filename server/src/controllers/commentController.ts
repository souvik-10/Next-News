import { Request, Response, NextFunction } from 'express';

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success', message: 'getComments endpoint foundation' });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({ status: 'success', message: 'addComment endpoint foundation' });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success', message: 'deleteComment endpoint foundation' });
  } catch (error) {
    next(error);
  }
};
