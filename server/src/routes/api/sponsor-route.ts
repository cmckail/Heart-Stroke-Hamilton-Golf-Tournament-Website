import { Router } from "express";
import multer from "multer";
import verifyUser from "../../middlewares/verify-user";
import SponsorController from "../../controllers/sponsor-controller";

const upload = multer().single("logo");

const sponsorRouter = Router();

sponsorRouter.get("/search", verifyUser, SponsorController.search);

sponsorRouter.post("/register", upload, verifyUser, SponsorController.register);

sponsorRouter.patch(
    "/update/:id",
    upload,
    verifyUser,
    SponsorController.update
);

sponsorRouter.delete("/delete/:id", verifyUser, SponsorController.delete);

sponsorRouter.get("/:id?", SponsorController.getAllOrByID);

export default sponsorRouter;
