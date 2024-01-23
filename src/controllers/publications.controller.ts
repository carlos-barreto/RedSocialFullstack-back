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

    const publications = await PublicationsModel.aggregate([                
        {
            $lookup: {
                from: "users",  
                localField: "user",
                foreignField: "_id",
                as: "usuario"
            }
        },        
        {   //se realiza un agregate para llamar los datos del usuario creador
            $project: {
                "_id": 0,
                "userName": "$usuario.firstName",
                "userEmail": "$usuario.email",
                "title":1,
                "description":1,
                "user":1,
                "image":1,
                "like":1,
                "createdBy":1,
                "directory":1,
                "filename":1,
                "isDirectory":1,
                "path":1,
                "createdAt": {
                    //se formatea la fecha ej: July 17, 2018
                    $concat: [
                        {
                            $substr: [
                                "$createdAt",
                                5,
                                2
                            ]
                        },
                        "-",
                        {
                            $switch: {
                                branches: [
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "01"] }, then: "January" },
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "02"] }, then: "February" },
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "03"] }, then: "March" },
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "04"] }, then: "April" },
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "05"] }, then: "May" },
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "06"] }, then: "June" },
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "07"] }, then: "July" },
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "08"] }, then: "August" },
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "09"] }, then: "September" },
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "10"] }, then: "October" },
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "11"] }, then: "November" },
                                    { case: { $eq: [{ $substr: ["$createdAt", 5, 2] }, "12"] }, then: "December" },
                                ],
                                default: ""
                            }
                        },
                        " ",
                        {
                            $substr: [
                                "$createdAt",
                                8,
                                2
                            ]
                        },
                        ", ",
                        {
                            $substr: [
                                "$createdAt",
                                0,
                                4
                            ]
                        }
                    ]
                }

            }
        }
    ]);

    return res.json({
        status: true,
        data: publications
    });
}
