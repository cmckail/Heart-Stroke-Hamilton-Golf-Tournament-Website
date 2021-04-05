import IRegistrationView from "@local/shared/view-models/registration";
import { Request, Response, NextFunction } from "express";
import Registration, { RegistrationPlayer } from "../models/registration";
import RegistrationRepository from "../repos/registration-repo";
import addToSession from "../utils/session";

const repo = new RegistrationRepository();

export default class RegistrationController {
    public static async register(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let item: IRegistrationView = req.body;

            addToSession(req, item);

            res.json(item);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public static async addToDB(registration: IRegistrationView[]) {
        registration.forEach(async (item) => {
            let regis = new Registration(item.teeRange, item.players);
            await repo.addToDB(regis);
        });
    }
}
