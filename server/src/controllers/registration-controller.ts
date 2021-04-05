import IRegistrationView from "@local/shared/view-models/registration";
import { Request, Response, NextFunction } from "express";
import { stripe } from "../config";
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

            // if (!req.session.registration) {
            //     req.session.registration = item;
            // } else {
            //     if (Array.isArray(req.session.registration)) {
            //         req.session.registration.push(item);
            //     } else {
            //         let array = [req.session.registration];
            //         array.push(item);
            //         req.session.registration = array;
            //     }
            // }

            res.json(item);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public static async addToDB(registration: IRegistrationView[]) {
        registration.forEach((item) => {});
    }
}
