import { Router } from 'express';
import { register, login, getMe } from '../controllers/authController';

const router = Router();

// Phase 2: Route definitions
router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);

export default router;
