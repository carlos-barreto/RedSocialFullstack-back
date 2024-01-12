import { Router } from 'express';
import { verifyUserToken } from '../middleware/auth';
import { uploadAvatar } from '../controllers/avatar.controller';

import path from 'path';
import multer from 'multer';

export const avatarRoutes = Router();

// GUARDAR UN AVATAR EN LABINNOVA
avatarRoutes.post(
  '/',
  multer({ dest: path.join(__dirname, '../archivos/temp') }).single('avatar'),
  verifyUserToken,
  uploadAvatar
);
