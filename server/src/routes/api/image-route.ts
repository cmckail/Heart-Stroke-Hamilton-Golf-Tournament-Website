import { Router } from "express";
import multer from "multer";

// import Image from "@local/shared/models/image";
// import { IImageViewModel } from "@local/shared/view-models/image";
import ImageController from "../../controllers/image-controller";
// import ImageRepository from "../../repos/image-repo";
// import HttpException from "../../utils/defaults/default-exception";
import verifyUser from "../../middlewares/verify-user";

const imageRouter = Router();
// const repo = new ImageRepository();

const upload = multer().array("photo");

/**
 * GET image route
 * Queries can be passed for filter searches
 */
imageRouter.get("/", ImageController.publicGetAll);

imageRouter.get("/search", verifyUser, ImageController.search);

/**
 * POST image route
 */
imageRouter.post("/upload", upload, verifyUser, ImageController.upload);

/**
 * DELETE image route
 */
imageRouter.delete("/delete/:id", verifyUser, ImageController.delete);

export default imageRouter;
