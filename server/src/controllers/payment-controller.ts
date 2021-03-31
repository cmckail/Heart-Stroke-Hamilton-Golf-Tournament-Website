import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";

import { stripe } from "../config";

/**
 * TODO: confirm payment intent controller
 */

export default class PaymentController {
    public static async createOrUpdatePaymentIntent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let amount = req.body.amount;
            let paymentIntent: Stripe.PaymentIntent;

            if (req.session.paymentIntent) {
                paymentIntent = await PaymentController.updatePaymentIntent(
                    req.session.paymentIntent!,
                    amount
                );
            } else {
                paymentIntent = await PaymentController.createPaymentIntent(
                    amount
                );
                req.session.paymentIntent = paymentIntent.id;
            }
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

    private static async createPaymentIntent(amount: number) {
        let params: Stripe.PaymentIntentCreateParams = {
            amount,
            currency: "cad",
        };

        const paymentIntent = await stripe.paymentIntents.create(params);
        return paymentIntent as Stripe.PaymentIntent;
    }

    private static async updatePaymentIntent(id: string, amount: number) {
        let params: Stripe.PaymentIntentUpdateParams = { amount };

        let paymentIntent = await stripe.paymentIntents.update(id, params);
        return paymentIntent;
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
            customer = customers.data[0];
        } else {
            customer = customers.data.find((x) => x.name === name);
        }

        return customer;
    }
}
