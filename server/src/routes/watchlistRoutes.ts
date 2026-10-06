import { Router } from 'express';
import {
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  checkWatchlistStatus,
} from '../controllers/watchlistController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.use(protect);

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.get('/status/:articleId', checkWatchlistStatus);
router.delete('/:articleId', removeFromWatchlist);

export default router;
