import IDonationView from "@local/shared/view-models/donation";
import { Request, Response, NextFunction } from "express";
import addToSession from "../utils/session";

/**
 * Donation controller
 */
export default class DonationController {
    /**
     * Creates a donation object
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let body = req.body as IDonationView;

            addToSession(req, body);

            res.json(body);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }
}
