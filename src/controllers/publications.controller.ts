import { Request, Response } from 'express';
import { PublicationsModel } from '../models/publications';
import { UserModel } from "../models/user";
import path from 'path';
import fs from 'fs-extra';


export const publications = async (req: Request, res: Response) => {
    try {

        const { data_token } = req.body;

        const rutaPublications = process.env.CARPETA_POST!;
        if (!fs.existsSync(rutaPublications)) {
            fs.mkdirSync(rutaPublications, { recursive: true });
        }

        const rutaDestino = path.join(rutaPublications, `/${req.file?.filename}.png`);
        console.log(rutaDestino);

        if (!req.file) {
            return res.json({
                status: false,
                error: 'No se ha cargado la imagen del avatar',
            });
        }

        if (!rutaDestino) {
            return res.json({
                status: false,
                error: 'Ocurrió un error al intentar guardar el avatar',
            });
        }

        fs.rename(req.file?.path!, rutaDestino);

        const post = await PublicationsModel.create({
            title: req.body.title,
            description: req.body.description,
            user: data_token.id,
            date_in: new Date().toISOString(),
            image: `${req.file?.filename}.png`,
            like: 0,
            createdBy: data_token.id,
            directory: 'assets/publications',
            filename: `${req.file?.filename}.png`,
            isDirectory: false,
            _isDeleted: false,
            path: `/assets/publications/${req.file?.filename}.png`,
            mimeType: req.file?.mimetype,
        });

        await post.save();
        post.toJSON();

        return res.json({
            status: true,
            post: post,
        });
    } catch (error) {
        // Elimino el archivo temporal
        if (req.file) {
            fs.unlink(req.file.path);
        }

        console.log(error);
        return res.json({
            status: false,
            error: 'Ocurrió un error',
        });
    }
};

export const getPublications = async (req: Request, res: Response) => {

    const publications = await PublicationsModel.find();

    return res.json({
        status: true,
        data: publications
    });
}
