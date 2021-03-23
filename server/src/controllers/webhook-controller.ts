import Sponsor from "@local/shared/models/sponsor";
import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import SponsorRepository from "../repos/sponsor-repo";

const sponsorRepository = new SponsorRepository();

export default class WebhookController {
    public static async invoke(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const event: Stripe.Event = req.body;

            switch (event.type) {
                case "payment_intent.succeeded":
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
