import { Router } from 'express';
import { verifyUserToken } from '../middleware/auth';
import { publications, getPublications } from '../controllers/publications.controller';
import path from 'path';
import multer from 'multer';
export const publicationsRoutes = Router();

// GUARDAR UNA IMAGEN EN LA CARPETA PUBLIC
publicationsRoutes.post(
  '/',
  multer({ dest: path.join(__dirname, '../public/assets/publications')}).single('image'),
  verifyUserToken,
  publications
);
publicationsRoutes.get(
  '/all',
  // verifyUserToken,
  getPublications
);
