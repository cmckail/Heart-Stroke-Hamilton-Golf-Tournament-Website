import Sponsor from "../models/sponsor";
import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import SponsorRepository from "../repos/sponsor-repo";

const sponsorRepository = new SponsorRepository();

/**
 * Webhook controller
 * FOR TESTING PURPOSES ONLY
 */
export default class WebhookController {
    public static async invoke(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const event: Stripe.Event = req.body;
            switch (event.type) {
                case "checkout.session.completed":
                    WebhookController.onPaymentSucceeded(
                        event.data.object as Stripe.WebhookEndpoint
                    );
                    break;
            }
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    private static onPaymentSucceeded(event: Stripe.WebhookEndpoint) {
        if (event.metadata.sponsor) {
            let sponsor = (event.metadata.sponsor as unknown) as Sponsor;
            sponsorRepository.addToDB(sponsor);
        }
    }
}
