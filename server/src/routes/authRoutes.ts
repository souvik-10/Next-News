import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Phase 3: Route definitions
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;
