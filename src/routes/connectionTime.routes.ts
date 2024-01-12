import { Router } from 'express';
import { getConnectionsUserByID } from '../controllers/connectionUserTime.controller';

export const connectionUserRoutes = Router();

// Obtener conexiones de los usuarios
connectionUserRoutes.post('/:all?', getConnectionsUserByID);
