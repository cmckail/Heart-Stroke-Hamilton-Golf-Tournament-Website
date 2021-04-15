import { NextFunction, Request, Response } from "express";
import Image from "../models/image";
import Photo from "../models/photo";
import PhotoRepository from "../repos/photo-repo";
import ImageController from "./image-controller";
import IPhotoView from "@local/shared/view-models/photo";
import imageSize from "image-size";

const repo = new PhotoRepository();

export default class PhotoController {
    public static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let result = await repo.find({});
            let resp = result.map((item) => {
                let dimensions = imageSize(item.image.data);
                let data: IPhotoView = {
                    src: ImageController.getURL(item.image.id),
                    width: dimensions.width,
                    height: dimensions.height,
                };
                return data;
            });
            res.json(resp);
        } catch (e) {
            next(e);
        }
    }

    public static async upload(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let files = req.files as Express.Multer.File[];

            const data = files.map((item) => {
                let image = new Image({
                    data: item.buffer,
                    mimetype: item.mimetype,
                });

                if (item.originalname && item.originalname !== "") {
                    image.filename = item.originalname;
                }

                let photo = new Photo({ image });

                return photo;
            });

            const results = await repo.addToDB(data);

            res.status(200).send(`${data.length} photos added.`);
        } catch (e) {
            next(e);
        }
    }
}
