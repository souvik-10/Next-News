import { Router } from 'express';
import {
  getArticles,
  getBreakingNews,
  getArticleByIdOrSlug,
  createArticle,
  subscribeRealTime,
} from '../controllers/articleController';

const router = Router();

router.get('/', getArticles);
router.post('/', createArticle);
router.get('/breaking', getBreakingNews);
router.get('/realtime/stream', subscribeRealTime);
router.get('/:idOrSlug', getArticleByIdOrSlug);

export default router;
