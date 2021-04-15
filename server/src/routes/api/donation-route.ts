/**
 * Router for use with the donation controller to present the view
 */
import { Router } from "express";
import DonationController from "../../controllers/donation-controller";

const donationRouter = Router();

donationRouter.post("/", DonationController.create);

export default donationRouter;
