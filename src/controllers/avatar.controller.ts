import { Request, Response } from 'express';
import { AssetsModel } from '../models/assets';
import path from 'path';
import fs from 'fs-extra';

export const uploadAvatar = async (req: Request, res: Response) => {
    try {
        const { data_token } = req.body;

        const rutaAvatares = process.env.CARPETA_AVATARES!;
        if(!fs.existsSync(rutaAvatares)) {
            fs.mkdirSync(rutaAvatares, { recursive: true });
        }
        
        const rutaDestino = path.join(rutaAvatares, `/${req.file?.filename}.png`);

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

        const asset = await AssetsModel.create({
            assetType: 'image',
            description: 'Avatar',
            directory: 'assets/avatares',
            filename: `${req.file?.filename}.png`,
            repository: 'localfs',
            size: req.file?.size,
            isDirectory: false,
            mimeType: req.file?.mimetype,
            path: `/assets/avatares/${req.file?.filename}.png`,
            thumbnailPath: `/assets/avatares/${req.file?.filename}.png`,
            title: 'Avatar.png',
            metadata: {
                width: 512,
                height: 512,
            },
            _isDeleted: false,
            createdBy: data_token.id,
        });

        await asset.save();
        asset.toJSON();

        return res.json({
            status: true,
            avatar: asset,
        });
    } catch (error) {
        // Elimino el archivo temporal
        if (req.file) {
            fs.unlink(req.file.path);
        }

        console.log(error);
        return res.json({
            status: false,
            error: 'Ocurrió un error al obtener los usuarios',
        });
    }
};
