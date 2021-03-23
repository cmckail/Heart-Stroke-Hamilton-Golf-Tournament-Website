import { Router } from "express";
import ImageController from "../../controllers/image-controller";

const imageRouter = Router();

imageRouter.get("/:id", ImageController.getImageContent);

export default imageRouter;
