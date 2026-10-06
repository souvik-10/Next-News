import { Router } from 'express';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../controllers/watchlistController';

const router = Router();

// Phase 2: Route definitions (Auth to be added in Phase 3)
router.get('/', getWatchlist);
router.post('/:articleId', addToWatchlist);
router.delete('/:articleId', removeFromWatchlist);

export default router;
