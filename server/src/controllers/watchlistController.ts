import { Request, Response, NextFunction } from 'express';
import { Watchlist } from '../models/Watchlist';
import { Article } from '../models/Article';
import { AppError } from '../utils/appError';
import mongoose from 'mongoose';

export const getWatchlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    let watchlist = await Watchlist.findOne({ userId }).populate({
      path: 'articles',
      select: 'title slug summary category imageUrl author readTimeMinutes viewsCount createdAt isBreaking',
    });

    if (!watchlist) {
      watchlist = await Watchlist.create({ userId, articles: [] });
    }

    res.status(200).json({
      status: 'success',
      results: watchlist.articles.length,
      data: {
        watchlist: watchlist.articles,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addToWatchlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { articleId } = req.body;

    if (!articleId || !mongoose.Types.ObjectId.isValid(articleId)) {
      return next(new AppError('Valid article ID is required', 400));
    }

    const article = await Article.findById(articleId);
    if (!article) {
      return next(new AppError('Article not found', 404));
    }

    let watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      watchlist = await Watchlist.create({ userId, articles: [articleId] });
    } else {
      if (!watchlist.articles.includes(articleId)) {
        watchlist.articles.push(articleId);
        await watchlist.save();
      }
    }

    res.status(200).json({
      status: 'success',
      message: 'Article added to watchlist',
      data: {
        articleId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWatchlist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { articleId } = req.params;

    if (!articleId) {
      return next(new AppError('Article ID is required', 400));
    }

    let watchlist = await Watchlist.findOne({ userId });
    if (watchlist) {
      watchlist.articles = watchlist.articles.filter(
        (id) => id.toString() !== articleId
      );
      await watchlist.save();
    }

    res.status(200).json({
      status: 'success',
      message: 'Article removed from watchlist',
      data: {
        articleId,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const checkWatchlistStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;
    const { articleId } = req.params;

    const watchlist = await Watchlist.findOne({ userId });
    const isSaved = watchlist
      ? watchlist.articles.some((id) => id.toString() === articleId)
      : false;

    res.status(200).json({
      status: 'success',
      data: {
        isSaved,
      },
    });
  } catch (error) {
    next(error);
  }
};
