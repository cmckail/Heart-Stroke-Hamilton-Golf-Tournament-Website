import Sponsor from "@local/shared/models/sponsor";
import { Router } from "express";
import Stripe from "stripe";
import SponsorRepository from "../../repos/sponsor-repo";

const webhookRouter = Router();

const sponsorRepository = new SponsorRepository();

webhookRouter.post("/", (req, res, next) => {
    const event: Stripe.Event = req.body;

    switch (event.type) {
        case "payment_intent.succeeded":
            onPaymentSucceeded(event.data.object as Stripe.WebhookEndpoint);
            break;
    }
});

const onPaymentSucceeded = (event: Stripe.WebhookEndpoint) => {
    if (event.metadata.sponsor) {
        let sponsor = (event.metadata.sponsor as unknown) as Sponsor;
        sponsorRepository.addToDB(sponsor);
    }
};

export default webhookRouter;
