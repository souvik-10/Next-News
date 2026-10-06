import { Router } from 'express';
import { getArticles, getBreakingNews, getArticleByIdOrSlug } from '../controllers/articleController';

const router = Router();

// Phase 2: Route definitions
router.get('/', getArticles);
router.get('/breaking', getBreakingNews);
router.get('/:identifier', getArticleByIdOrSlug);

export default router;
