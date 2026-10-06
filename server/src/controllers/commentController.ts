import { Request, Response, NextFunction } from 'express';
import { Comment } from '../models/Comment';
import { Article } from '../models/Article';
import { AppError } from '../utils/appError';
import { sseBroadcaster } from '../utils/sseBroadcaster';

export const getComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { articleId } = req.params;

    const comments = await Comment.find({ articleId })
      .populate('userId', 'name avatarUrl')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: comments.length,
      data: {
        comments,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { articleId } = req.params;
    const { content } = req.body;
    const userId = req.user?.id;

    if (!content || !content.trim()) {
      return next(new AppError('Comment content is required', 400));
    }

    const article = await Article.findById(articleId);
    if (!article) {
      return next(new AppError('Article not found', 404));
    }

    let comment = await Comment.create({
      articleId,
      userId,
      content: content.trim(),
    });

    comment = await comment.populate('userId', 'name avatarUrl');

    // Broadcast SSE comment update
    sseBroadcaster.broadcast('new_comment', {
      articleId,
      comment,
    });

    res.status(201).json({
      status: 'success',
      data: {
        comment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new AppError('Comment not found', 404));
    }

    if (comment.userId.toString() !== userId) {
      return next(new AppError('You are not authorized to delete this comment', 403));
    }

    await comment.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Comment deleted successfully',
      data: {
        commentId,
      },
    });
  } catch (error) {
    next(error);
  }
};
