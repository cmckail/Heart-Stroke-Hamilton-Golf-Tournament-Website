import { Router } from "express";

import { baseURL, stripe } from "../config";

const paymentRouter = Router();

paymentRouter.post("/", async (req, res, next) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "FEDORA TIPPERS INC",
                        images: [
                            "https://cdn.discordapp.com/attachments/525510041881673748/806311722590666782/unknown.png",
                        ],
                    },
                    unit_amount: 2000,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${baseURL + req.originalUrl}?success=true`,
        cancel_url: `${baseURL + req.originalUrl}?canceled=true`,
    });

    res.json({ id: session.id });
});

paymentRouter.post("/create-payment-intent", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const amount = req.body.amount;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "cad",
        receipt_email: email,
    });

    console.log(paymentIntent.client_secret);
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

export default paymentRouter;
