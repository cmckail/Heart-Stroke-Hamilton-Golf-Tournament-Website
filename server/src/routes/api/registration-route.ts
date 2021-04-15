/**
 * Registration router for use with the registration controller when users sign up
 */
import { Router } from "express";
import RegistrationController from "../../controllers/registration-controller";

const registrationRouter = Router();

registrationRouter.post("/", RegistrationController.register);

export default registrationRouter;
