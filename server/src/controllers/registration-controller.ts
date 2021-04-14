import IRegistrationView from "@local/shared/view-models/registration";
import { Request, Response, NextFunction } from "express";
import Registration, { RegistrationPlayer } from "../models/registration";
import RegistrationRepository from "../repos/registration-repo";
import addToSession from "../utils/session";

const repo = new RegistrationRepository();

/**
 * Registration controller
 */
export default class RegistrationController {
    /**
     * Creates a registration object and stores it into session
     * @param req express request
     * @param res express response
     * @param next express next function
     */
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

    /**
     * Stores a registration session into DB
     * @param registration Registration session user data
     */
    public static async addToDB(registration: IRegistrationView[]) {
        registration.forEach(async (item) => {
            let regis = new Registration(item.teeRange, item.players);
            await repo.addToDB(regis);
        });
    }
}
