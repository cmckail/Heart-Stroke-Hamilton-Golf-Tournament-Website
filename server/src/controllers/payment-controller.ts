import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";

import { stripe } from "../config";

export default class PaymentController {
    public static async createOrUpdatePaymentIntent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let name = req.body.name;
            let email = req.body.email;
            let amount = req.body.amount;
            let paymentIntent: Stripe.PaymentIntent;

            if (name === "") {
                name = undefined;
            }

            if (email === "") {
                email = undefined;
            }

            if (req.session.paymentIntent) {
                if (req.query.update) {
                }
                paymentIntent = await stripe.paymentIntents.retrieve(
                    req.session.paymentIntent
                );
            } else {
                paymentIntent = await PaymentController.createPaymentIntent(
                    amount,
                    name,
                    email
                );
                req.session.paymentIntent = paymentIntent.id;
            }

            res.json({ clientSecret: paymentIntent.client_secret });
        } catch (e) {
            next(e);
        }
    }

    private static async createPaymentIntent(
        amount: number,
        name?: string,
        email?: string
    ) {
        let params: Stripe.PaymentIntentCreateParams = {
            amount,
            currency: "cad",
            receipt_email: email,
        };
        if (name) {
            let customer =
                (await PaymentController.findCustomerByName(name, email)) ||
                (await PaymentController.createCustomer(name, email));
            params.customer = customer.id;
        }

        const paymentIntent = await stripe.paymentIntents.create(params);
        return paymentIntent as Stripe.PaymentIntent;
    }

    private static async updatePaymentIntent(
        id: string,
        amount: number,
        name?: string,
        email?: string
    ) {
        let params: Stripe.PaymentIntentUpdateParams = { amount };

        if (name) {
            let customer =
                (await PaymentController.findCustomerByName(name, email)) ||
                (await PaymentController.createCustomer(name, email));
            params.customer = customer.id;
        }

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
