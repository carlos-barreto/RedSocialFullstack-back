import { Router } from 'express';
import { verifyUserToken } from '../middleware/auth';
import { isLogged, loginUser, registerUser } from '../controllers/auth.controller';

export const autenticacionRoutes = Router();

// SABER SI UN USUARIO ESTA LOGEADO
autenticacionRoutes.get('/is_logged', verifyUserToken, isLogged);

// VERIFICAR USUARIO Y RETORNARLE UN TOKEN
autenticacionRoutes.post('/login', loginUser);

// REGISTRAR UN USUARIO
autenticacionRoutes.post('/register', registerUser);
