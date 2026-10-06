import { Request, Response, NextFunction } from 'express';

export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success', message: 'getArticles endpoint foundation' });
  } catch (error) {
    next(error);
  }
};

export const getBreakingNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success', message: 'getBreakingNews endpoint foundation' });
  } catch (error) {
    next(error);
  }
};

export const getArticleByIdOrSlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ status: 'success', message: 'getArticleByIdOrSlug endpoint foundation' });
  } catch (error) {
    next(error);
  }
};
