import { Request, Response } from "express";
import { UserModel } from "../models/user";

import jwt from "jsonwebtoken";
var bcrypt = require("bcryptjs");


export const isLogged = async (req: Request, res: Response) => {
  try {
    const { data_token } = req.body;

    const usuario = await UserModel.findOne({ _id: data_token.id })
      .select("_id email firstName lastName tipo_usuario admin")
      .populate([
        {
          path: "roles",
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

    usuario.admin = false;


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
    const { email, password } = req.body;
    console.log(email, password);

    UserModel.findOne({
      email: email,
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        //SE VALIDA EL USUARIO
        if (!user) {
          return res.status(404).send({ message: "Usuario o Contraseña errada." });
        }

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
          //SE VALIDA LA CONTRASEÑA
        if (!passwordIsValid) {
          return res.status(401).send({ message: "Contraseña o Usuario errada." });
        }

        const token = jwt.sign(
          {
            id: user._id,
            nombres: user.firstName,
            apellidos: user.lastName,
            correo: user.email,
            admin: user.admin,
          },
          process.env.SECRET_KEY!

        );

        return res.status(200).send({
          status: true,
          id: user._id,
          username: user.firstName,
          email: user.email,
          token,
        });
      });

  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      error: "Ocurrió un error al iniciar la sesión del usuario",
    });
  }
};


export const registerUser = async (req: Request, res: Response) => {
  try {

    const user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      firstAccess: '12/01/2024 10:35',
      password: bcrypt.hashSync(req.body.password, 8),
      // Identificacion perfil de usuario
      tipo_usuario: 'user',// Puedes ser admin o user
      auth: "register",
      failedLoginCount: 0,
      idNumber: Math.floor((Math.random() * 100) + 1),
      _isDeleted: false,
    });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    });
    res.send({ message: "Usuario registrado!", "user": user });

  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      error: "Ocurrió un error al iniciar la sesión del usuario",
    });
  }
};
