import { Router } from "express";
import { autenticacionRoutes } from "./auth.routes";
import { verifyUserToken } from "../middleware/auth";
import { publicationsRoutes } from "./publications.routes";
// Declaracion de rutas disponibles para ser consumidas en el API
export const apiRoutes = Router();

apiRoutes.use("/autenticacion", autenticacionRoutes);
apiRoutes.use("/publications", 
// verifyUserToken,
publicationsRoutes);
