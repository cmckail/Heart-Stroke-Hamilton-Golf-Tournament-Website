import { Router } from "express";
import PhotoController from "../../controllers/photo-controller";

const photoRouter = Router();

photoRouter.get("/", PhotoController.getAll);

export default photoRouter;
