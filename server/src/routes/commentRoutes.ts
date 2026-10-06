import { Router } from 'express';
import { getComments, addComment, deleteComment } from '../controllers/commentController';

// mergeParams allows us to access articleId from the parent router if nested
const router = Router({ mergeParams: true });

// Phase 2: Route definitions (Auth to be added in Phase 3)
router.get('/', getComments);
router.post('/', addComment);
router.delete('/:commentId', deleteComment);

export default router;
