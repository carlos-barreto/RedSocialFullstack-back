import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * @titulo verifyUserToken
 * @descricion Realiza la verificación de autenticación de un usuario antes de realizar cualquier solicitud
 * @returns Error si la auntenticación falla o información del usuario, si la autenticación es exitosa
 */
export const verifyUserToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  if (!token) return res.json({ status: false, error: 'Acceso denegado' });

  try {
    token = token.split(' ')[1];

    if (token === 'null' || !token)
      return res.json({ status: false, error: 'Acceso denegado' });

    let dataToken = jwt.verify(token, process.env.SECRET_KEY!);
    if (!dataToken)
      return res.json({ status: false, error: 'Token invalido, acceso denegado' });

    req.body.data_token = dataToken;
    next();
  } catch (error) {
    return res.json({ status: false, error: 'Sesión inválida' });
  }
};

/**
 * @titulo identifyUserToken
 * @descricion Realiza la identificación de un usuario mediante el JWT
 * @returns error si la identificación falla o la información del usuario, si la autenticación es exitosa
 */
export const identifyUserToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) return next();

  try {
    token = token.split(' ')[1];

    if (token === 'null' || !token) return next();

    let dataToken = jwt.verify(token, process.env.SECRET_KEY!);
    if (!dataToken) return next();

    req.body.data_token = dataToken;
    next();
  } catch (error) {
    next();
  }
};
