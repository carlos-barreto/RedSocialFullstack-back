import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { RolesModel } from "../models/roles";
import { CoursesModel } from "../models/courses";
import { ComponentsModel } from "../models/components";

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await UserModel.find()
      .populate([
        {
          path: "roles",
          model: RolesModel,
          select: "name",
        },
      ])
      .select(
        "firstName lastName email roles firstAccess lastAccess tiempo_desconexion duracion_alerta fecha_inicio_alertas tipo_usuario"
      );

    for (const usuario of usuarios) {
      const cursosUsuario = await CoursesModel.find({
        createdBy: usuario._id,
      }).select("_id");

      usuario.courses = cursosUsuario.length;

      const idsCursos = cursosUsuario.map((c) => c._id.toString());
      const componentesUtilizados = await ComponentsModel.find({
        _courseId: { $in: idsCursos },
      }).select(" _component ");

      usuario.componentes_utilizados = componentesUtilizados.length;
    }

    return res.json({
      status: true,
      usuarios: usuarios,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      error: "Ocurrió un error al obtener los usuarios",
    });
  }
};

export const getUsuarioById = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;

    const usuario = await UserModel.findOne({ _id })
      .populate([
        {
          path: "roles",
          model: RolesModel,
          select: "name",
        },
      ])
      .select("firstName lastName email roles firstAccess lastAccess");

    if (!usuario) {
      return res.json({
        status: false,
        error: "No se ha encontrado el usuario",
      });
    }

    usuario.courses = await CoursesModel.find({ createdBy: usuario._id })
      .select("title createdAt updatedAt")
      .count();

    return res.json({
      status: true,
      usuario: usuario,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: false,
      error: "Ocurrió un error al obtener el usuario",
    });
  }
};
