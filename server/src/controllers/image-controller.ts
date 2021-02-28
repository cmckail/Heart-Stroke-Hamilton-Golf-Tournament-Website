import { Router } from "express";
import multer from "multer";

import Image from "../models/image";
import ImageRepository from "../repos/image-repo";
import HttpException from "../utils/defaults/default-exception";
import { baseURL } from "../config";
import verifyUser from "../middlewares/verify-user";

const imageRouter = Router();
const repo = new ImageRepository();

const upload = multer().array("photo");

/**
 * GET image route
 * Queries can be passed for filter searches
 */
imageRouter.get("/", verifyUser, async (req, res, next) => {
    try {
        let queries = req.query;

        if (queries) {
            let result = await repo.find(queries);

            let resp = result.map((item) => {
                return {
                    url: baseURL + "/images/" + item.publicId,
                    filename: item.filename,
                    mimetype: item.mimetype,
                };
            });

            res.json(resp);
        }
    } catch (e) {
        next(e);
    }
});

imageRouter.post("/test", verifyUser, async (req, res, next) => {
    console.log(req.body);
    res.json(req.body);
});

/**
 * POST image route
 */
imageRouter.post("/upload", upload, verifyUser, async (req, res, next) => {
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
                return { url: baseURL + "/images/" + item.id };
            });
        } else {
            resp = { url: baseURL + "/images/" + results.id };
        }

        res.json(resp);
    } catch (e) {
        next(e);
    }
});

/**
 * DELETE image route
 */
imageRouter.delete("/delete/:id", verifyUser, async (req, res, next) => {
    try {
        const resp = await repo.delete(req.params.id);

        res.json({ rows: resp });
    } catch (e) {
        next(e);
    }
});

/**
 * GET image route given ID
 */
imageRouter.get("/:id", async (req, res, next) => {
    try {
        if (!req.params.id || req.params.id === "")
            throw new Error("Missing ID.");

        const image = await repo.findByPublicID(req.params.id);

        if (typeof image === "undefined")
            throw new HttpException(404, "Cannot find image with specified ID");

        res.contentType(image!.mimetype);
        res.send(image!.data);
    } catch (e) {
        next(e);
    }
});

export default imageRouter;
