import { Router } from 'express';
import { getComments, addComment, deleteComment } from '../controllers/commentController';
import { protect } from '../middleware/authMiddleware';

const router = Router({ mergeParams: true });

router.get('/', getComments);
router.post('/', protect, addComment);
router.delete('/:commentId', protect, deleteComment);

export default router;
