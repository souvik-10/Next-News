import { Request, Response, NextFunction } from 'express';
import { Article } from '../models/Article';
import { AppError } from '../utils/appError';
import { sseBroadcaster } from '../utils/sseBroadcaster';

export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const skip = (page - 1) * limit;

    const { category, search, tag, sort } = req.query;

    const queryFilter: any = {};

    if (category && category !== 'All') {
      queryFilter.category = category;
    }

    if (tag) {
      queryFilter.tags = tag;
    }

    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      queryFilter.$or = [
        { title: searchRegex },
        { summary: searchRegex },
        { content: searchRegex },
      ];
    }

    let sortOption: any = { createdAt: -1 };
    if (sort === 'popular') {
      sortOption = { viewsCount: -1, createdAt: -1 };
    }

    const [articles, total] = await Promise.all([
      Article.find(queryFilter).sort(sortOption).skip(skip).limit(limit),
      Article.countDocuments(queryFilter),
    ]);

    res.status(200).json({
      status: 'success',
      results: articles.length,
      data: {
        articles,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
          limit,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBreakingNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const breakingArticles = await Article.find({ isBreaking: true })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      status: 'success',
      data: {
        articles: breakingArticles,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getArticleByIdOrSlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idOrSlug } = req.params;

    let article;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      article = await Article.findById(idOrSlug);
    } else {
      article = await Article.findOne({ slug: idOrSlug });
    }

    if (!article) {
      return next(new AppError('Article not found', 404));
    }

    // Increment views count asynchronously
    article.viewsCount += 1;
    await article.save();

    res.status(200).json({
      status: 'success',
      data: {
        article,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createArticle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, summary, content, category, imageUrl, author, tags, isBreaking, readTimeMinutes } = req.body;

    if (!title || !summary || !content || !category || !author) {
      return next(new AppError('Title, summary, content, category, and author are required', 400));
    }

    // Generate unique slug
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    const existingArticle = await Article.findOne({ slug });
    if (existingArticle) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const article = await Article.create({
      title,
      slug,
      summary,
      content,
      category,
      imageUrl: imageUrl || '',
      author,
      tags: tags || [],
      isBreaking: !!isBreaking,
      readTimeMinutes: readTimeMinutes || 3,
    });

    // Broadcast SSE real-time event
    if (article.isBreaking) {
      sseBroadcaster.broadcast('breaking_news', {
        id: article._id,
        title: article.title,
        category: article.category,
        slug: article.slug,
        createdAt: article.createdAt,
      });
    }

    res.status(201).json({
      status: 'success',
      data: {
        article,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const subscribeRealTime = (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const clientId = Date.now().toString();
  sseBroadcaster.addClient(clientId, res);

  req.on('close', () => {
    sseBroadcaster.removeClient(clientId);
  });
};
