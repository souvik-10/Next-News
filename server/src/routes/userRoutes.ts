import { Router } from 'express';
import { getProfile, updateProfile, uploadAvatar } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';
import { uploadAvatarMiddleware } from '../middleware/uploadMiddleware';

const router = Router();

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/profile/avatar', uploadAvatarMiddleware.single('avatar'), uploadAvatar);

export default router;
