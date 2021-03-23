import { Router } from "express";
import RegistrationController from "../../controllers/registration-controller";

const registrationRouter = Router();

registrationRouter.post("/", RegistrationController.register);

export default registrationRouter;
