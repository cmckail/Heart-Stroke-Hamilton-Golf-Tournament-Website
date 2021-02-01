import { Router } from "express";
import { getConnection } from "typeorm";
import multer from "multer";

import Image, { ImageRepository } from "../models/image";
import HttpException from "../utils/errors/httpException";

const imageRouter = Router();
const repo = new ImageRepository();

const upload = multer();

/**
 * TODO: Finish this
 * GET image route via queries
 */
imageRouter.get("/", async (req, res, next) => {
    try {
        let queries = req.query;

        if ("filename" in queries || "mimetype" in queries || "id" in queries) {
        } else {
            throw new HttpException(400, "Invalid queries");
        }
    } catch (e) {
        next(e);
    }
});

/**
 * POST image route
 */
imageRouter.post("/upload", upload.single("photo"), async (req, res, next) => {
    try {
        let file = req.file;

        let image: Image = {
            mimetype: file.mimetype,
            data: file.buffer,
        };

        if (file.originalname && file.originalname !== "") {
            image.filename = file.originalname;
        }

        const results = await repo.addToDB(image);

        res.json(results);
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
        const image = await repo.findByID(req.params.id);

        if (typeof image === "undefined")
            throw new HttpException(404, "Cannot find image with specified ID");

        res.contentType(image!.mimetype);
        res.send(image!.data);
    } catch (e) {
        next(e);
    }
});

export default imageRouter;
