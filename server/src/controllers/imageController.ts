import { Router } from "express";
import { getConnection } from "typeorm";
import multer from "multer";

import Image from "../models/image";

const imageRouter = Router();
const repo = getConnection().getRepository(Image);

const upload = multer();

imageRouter.post("/upload", upload.single("photo"), async (req, res, next) => {
    let file = req.file;

    const imageObj = await repo.create({
        mimetype: file.mimetype,
        data: file.buffer,
    });

    const results = await repo.save(imageObj);

    res.json({ msg: "OK" });
});

imageRouter.get("/:id", async (req, res, next) => {
    if (!req.params.id || req.params.id === "") throw new Error("Missing ID.");
    const image = await repo.findOne(req.params.id);

    if (typeof image === undefined)
        throw new Error("Cannot find image with specified ID");

    res.contentType(image!.mimetype);
    res.send(image!.data);
});

export default imageRouter;
