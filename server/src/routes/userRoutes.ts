import { Router } from 'express';
import { getProfile, updateProfile, uploadAvatar } from '../controllers/userController';

const router = Router();

// Phase 2: Route definitions (Authentication middleware to be added in Phase 3)
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/profile/avatar', uploadAvatar);

export default router;
