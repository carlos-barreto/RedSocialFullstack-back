import { Request, Response } from "express";
import { IRoles, RolesModel } from "../models/roles";
import { UserModel } from "../models/user";

import jwt from "jsonwebtoken";

export const isLogged = async (req: Request, res: Response) => {
  try {
    const { data_token } = req.body;

    const usuario = await UserModel.findOne({ _id: data_token.id })
      .select("_id email firstName lastName tipo_usuario admin")
      .populate([
        {
          path: "roles",
          model: RolesModel,
          select: "name",
        },
      ]);

    if (!usuario) {
      return res.json({
        status: false,
        mensaje: "Usuario no registrado",
      });
    }

    // Identificar si el usuario es administrador o no
    if (usuario.roles.find((r: IRoles) => r.name == process.env.ROL_ADMIN)) {
      usuario.admin = true;
    } else {
      usuario.admin = false;
    }

    return res.json({
      status: true,
      usuario: usuario,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      error: "Ocurrió un error al obtener los usuarios",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { id, correo } = req.body;

    const usuario = await UserModel.findOne({ _id: id, email: correo })
      .select("_id email firstName lastName tipo_usuario admin")
      .populate([
        {
          path: "roles",
          model: RolesModel,
          select: "name",
        },
      ]);

    if (!usuario) {
      return res.json({
        status: false,
        mensaje: "Datos de usuario incorrectos",
      });
    }

    // Identificar si el usuario es administrador o no
    if (usuario.roles.find((r: IRoles) => r.name == process.env.ROL_ADMIN)) {
      usuario.admin = true;
    } else {
      usuario.admin = false;
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        nombres: usuario.firstName,
        apellidos: usuario.lastName,
        correo: usuario.email,
        admin: usuario.admin,
      },
      process.env.SECRET_KEY!
    );

    return res.json({
      status: true,
      usuario: usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      error: "Ocurrió un error al iniciar la sesión del usuario",
    });
  }
};
