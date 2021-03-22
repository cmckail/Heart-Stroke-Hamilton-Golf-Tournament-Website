import { Router } from "express";
import DonationController from "../../controllers/donation-controller";

const donationRouter = Router();

donationRouter.post("/", DonationController.create);

export default donationRouter;
