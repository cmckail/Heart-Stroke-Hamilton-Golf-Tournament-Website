import Registration from "@local/shared/models/registration";
import { Router } from "express";
import RegistrationRepository from "../../repos/registration-repo";

const registrationRouter = Router();
const repo = new RegistrationRepository();

registrationRouter.post("/", async (req, res, next) => {
    let item: Registration = req.body;

    let result = await repo.addToDB(item);

    res.json(result);
});

export default registrationRouter;
