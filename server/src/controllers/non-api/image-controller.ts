import { Router } from "express";
import ImageRepository from "../../repos/image-repo";
import HttpException from "../../utils/defaults/default-exception";

const imageRouter = Router();
const repo = new ImageRepository();

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
