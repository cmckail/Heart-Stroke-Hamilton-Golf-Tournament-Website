import { NextFunction, Router, Request, Response } from "express";

import Image from "@local/shared/models/image";
import { IImageViewModel } from "@local/shared/view-models/image";
import ImageRepository from "../repos/image-repo";
import HttpException from "../utils/defaults/default-exception";

const repo = new ImageRepository();

export default class ImageController {
    public static async publicGetAll(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let result = await repo.find({});

            let resp = result.map((item) =>
                ImageController.getURL(item.publicId!)
            );

            res.json(resp);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public static async getImageContent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (!req.params.id || req.params.id === "")
                throw new Error("Missing ID.");

            const image = await repo.findByPublicID(req.params.id);

            if (typeof image === "undefined")
                throw new HttpException(
                    404,
                    "Cannot find image with specified ID"
                );

            res.contentType(image!.mimetype);
            res.send(image!.data);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public static async search(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let result = await repo.find({ where: req.query });

            let resp: IImageViewModel[] = result.map((item) => {
                return {
                    id: item.id!,
                    publicId: item.publicId!,
                    filename: item.filename!,
                    mimetype: item.mimetype,
                    createdAt: item.createdAt,
                };
            });

            res.json(resp);
        } catch (e) {
            console.error(e);
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
                let image: Image = {
                    mimetype: item.mimetype,
                    data: item.buffer,
                };

                if (item.originalname && item.originalname !== "") {
                    image.filename = item.originalname;
                }

                return image;
            });

            const results = await repo.addToDB(data);

            let resp;
            if (Array.isArray(results)) {
                resp = results.map((item) => {
                    return { ...item, data: undefined };
                });
            } else {
                resp = { ...results, data: undefined };
            }

            res.json(resp);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const resp = await repo.delete(req.params.id);

            res.json({ rows: resp });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public static getURL(publicID: string) {
        return `/images/${publicID}`;
    }
}
