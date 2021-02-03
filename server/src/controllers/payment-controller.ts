import { Router } from "express";
import Stripe from "stripe";

const paymentRouter = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2020-08-27",
    typescript: true,
});

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
        success_url: `${process.env.BASE_URL + req.originalUrl}?success=true`,
        cancel_url: `${process.env.BASE_URL + req.originalUrl}?canceled=true`,
    });

    res.json({ id: session.id });
});

export default paymentRouter;
