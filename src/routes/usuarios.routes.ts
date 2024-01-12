import { Router } from 'express';
import { getUsuarioById, getUsuarios } from '../controllers/usuarios.controller';

export const usuariosRoutes = Router();

// OBTENER USUARIOS CON SU ROL
usuariosRoutes.get('/', getUsuarios);

// OBTENER USUARIO POR ID
usuariosRoutes.get('/:_id', getUsuarioById);
