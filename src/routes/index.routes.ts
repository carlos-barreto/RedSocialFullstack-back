import { Router } from "express";
import { usuariosRoutes } from "./usuarios.routes";
import { autenticacionRoutes } from "./auth.routes";
import { verifyUserToken } from "../middleware/auth";
// import { cursosRoutes } from './cursos.routes';
// import { tagsRoutes } from './tags.routes';
// import { componentesRoutes } from './componentes.routes';
// import { avatarRoutes } from './avatar.routes';
// import { connectionUserRoutes } from './connectionTime.routes';
// import { conversionesRoutes } from './conversiones.routes';
// import { cargaUsuariosRoutes } from './carga_usuarios.routes';
// import {platformRoutes} from "./platformLTI.routes";
// import { encuestaRoutes } from './encuesta.routes';

// Declaracion de rutas disponibles para ser consumidas en el API
export const apiRoutes = Router();

apiRoutes.use("/autenticacion", autenticacionRoutes);
apiRoutes.use("/usuarios", verifyUserToken, usuariosRoutes);
// apiRoutes.use('/carga_usuarios', cargaUsuariosRoutes);
// apiRoutes.use('/tags', verifyUserToken, tagsRoutes);
// apiRoutes.use('/cursos', verifyUserToken, cursosRoutes);
// apiRoutes.use('/componentes', verifyUserToken, componentesRoutes);
// apiRoutes.use('/encuesta', verifyUserToken, encuestaRoutes);
// apiRoutes.use('/conversiones', conversionesRoutes);
// apiRoutes.use('/avatar', avatarRoutes);
// apiRoutes.use('/connectionTimes', verifyUserToken, connectionUserRoutes);
// apiRoutes.use('/platform', platformRoutes);
