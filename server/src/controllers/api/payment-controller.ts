import { Router } from "express";

import { stripe } from "../../config";

import Stripe from "stripe";

const paymentRouter = Router();

paymentRouter.post("/create-payment-intent", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const amount = req.body.amount;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "cad",
        receipt_email: email,
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

export default paymentRouter;
