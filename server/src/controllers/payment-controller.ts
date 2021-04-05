import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { SessionUserData } from "../../@types";

import { stripe } from "../config";

export default class PaymentController {
    public static async createOrUpdatePaymentIntent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let amount = req.body.amount;
            let paymentIntent: Stripe.PaymentIntent;

            paymentIntent = req.session.paymentIntent
                ? (await PaymentController.updatePaymentIntent(
                      req.session.paymentIntent!,
                      amount
                  )) || (await PaymentController.createPaymentIntent(amount))
                : await PaymentController.createPaymentIntent(amount);

            await PaymentController.updateDescription(
                paymentIntent.id,
                req.session.data!
            );

            req.session.paymentIntent = paymentIntent.id;
            res.json({ clientSecret: paymentIntent.client_secret });
        } catch (e) {
            next(e);
        }
    }

    public static async addCustomerToPaymentIntent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let email = req.body.email;
            let name = req.body.name;
            let id = req.session.paymentIntent;

            if (!id) throw new Error("Missing PaymentIntentID");

            let params: Stripe.PaymentIntentUpdateParams = {};
            if (email) params.receipt_email = email;

            let customer =
                (await PaymentController.findCustomerByName(name, email)) ||
                (await PaymentController.createCustomer(name, email));

            params.customer = customer.id;
            let paymentIntent = await stripe.paymentIntents.update(id, params);
            res.json({ clientSecret: paymentIntent.client_secret });
        } catch (e) {
            next(e);
        }
    }

    public static async paymentSuccessful(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            if (req.session.paymentIntent) {
                let paymentIntent = await stripe.paymentIntents.retrieve(
                    req.session.paymentIntent
                );

                if (
                    paymentIntent.status === "succeeded" ||
                    paymentIntent.status === "canceled"
                ) {
                    if (req.session.data?.registration) {
                    }
                    req.session.destroy((err) => {
                        next(err);
                    });
                }
            }
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    private static async createPaymentIntent(amount: number) {
        let params: Stripe.PaymentIntentCreateParams = {
            amount,
            currency: "cad",
        };

        const paymentIntent = await stripe.paymentIntents.create(params);
        return paymentIntent as Stripe.PaymentIntent;
    }

    private static async updatePaymentIntent(
        id: string,
        amount: number,
        params?: Stripe.PaymentIntentUpdateParams
    ) {
        let param: Stripe.PaymentIntentUpdateParams = { amount, ...params };
        let paymentIntent: Stripe.PaymentIntent | undefined;

        if (
            (await stripe.paymentIntents.retrieve(id)).status ===
            "requires_payment_method"
        ) {
            paymentIntent = await stripe.paymentIntents.update(id, param);
        }
        return paymentIntent;
    }

    private static async updateDescription(id: string, data: SessionUserData) {
        let desc: string[] = [];
        if (data.registration) desc.push("Tournament registration");
        if (data.donation) desc.push("Donation");
        if (data.sponsor) desc.push("Sponsorship");

        await stripe.paymentIntents.update(id, {
            description: desc.join(", "),
        });
    }

    private static async createCustomer(name: string, email?: string) {
        let customer = await stripe.customers.create({
            name,
            email,
        });
        return customer;
    }

    private static async findCustomerByName(name: string, email?: string) {
        let customer: Stripe.Customer | undefined = undefined;

        let customers = await stripe.customers.list({ email });

        if (customers.data.length === 1) {
            if (customers.data[0].name === name) customer = customers.data[0];
        } else {
            customer = customers.data.find((x) => x.name === name);
        }

        return customer;
    }
}
