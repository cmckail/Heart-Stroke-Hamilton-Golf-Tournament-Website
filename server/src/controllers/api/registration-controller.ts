import Registration from "@local/shared/models/registration";
import IRegistrationView from "@local/shared/view-models/registration";
import { Router } from "express";
import RegistrationRepository from "../../repos/registration-repo";

const registrationRouter = Router();
const repo = new RegistrationRepository();

registrationRouter.post("/", async (req, res, next) => {
    try {
        let item: IRegistrationView = req.body;

        if (!req.session.registration) {
            req.session.registration = item;
        } else {
            if (Array.isArray(req.session.registration)) {
                req.session.registration.push(item);
            } else {
                let array = [req.session.registration];
                array.push(item);
                req.session.registration = array;
            }
        }

        res.json(item);
    } catch (e) {
        next(e);
    }
});

export default registrationRouter;
