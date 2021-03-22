import { Request, Response, NextFunction } from "express";

import { stripe } from "../config";

export default class PaymentController {
    public static async createPaymentIntent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
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
        } catch (e) {
            console.error(e);
            next(e);
        }
    }
}
