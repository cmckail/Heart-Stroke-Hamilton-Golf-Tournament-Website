import { Router } from "express";
import multer from "multer";
import ImageController from "../../controllers/image-controller";
import verifyUser from "../../middlewares/verify-user";

const imageRouter = Router();

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
imageRouter.post("/upload", upload, ImageController.upload);

/**
 * DELETE image route
 */
imageRouter.delete("/delete/:id", verifyUser, ImageController.delete);

export default imageRouter;
