import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import SessionUserData from "@local/shared/view-models/session";

import { stripe } from "../config";
import RegistrationController from "./registration-controller";

/**
 * Payment controller
 */
export default class PaymentController {
    /**
     * Creates a new payment intent or updates an existing payment intent.
     * @param req express request
     * @param res express response
     * @param next express next function
     */
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

    /**
     * Adds a new or existing customer to payment intent
     * @param req express request
     * @param res express response
     * @param next express next function
     */
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

    /**
     * Handles logic when payment is successful
     * @param req express request
     * @param res express response
     * @param next express next function
     */
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

                if (paymentIntent.status === "succeeded") {
                    if (req.session.data?.registration) {
                        await RegistrationController.addToDB(
                            req.session.data.registration
                        );
                    }
                    req.session.destroy((err) => {
                        next(err);
                    });
                } else {
                    throw new Error("Payment not succeeded.");
                }
            }
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }

    /**
     * Creates a new payment intent object
     * @param amount total payment amount
     * @returns payment intent object
     */
    private static async createPaymentIntent(amount: number) {
        let params: Stripe.PaymentIntentCreateParams = {
            amount,
            currency: "cad",
        };

        const paymentIntent = await stripe.paymentIntents.create(params);
        return paymentIntent as Stripe.PaymentIntent;
    }

    /**
     * Updates an existing payment intent object
     * @param id id of payment intent
     * @param amount total payment amount
     * @param params optional payment intent params
     * @returns payment intent object
     */
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

    /**
     * Updates the description of payment intent
     * @param id id of payment intent
     * @param data session user data
     */
    private static async updateDescription(id: string, data: SessionUserData) {
        let desc: string[] = [];
        if (data.registration) desc.push("Tournament registration");
        if (data.donation) desc.push("Donation");
        if (data.sponsor) desc.push("Sponsorship");

        await stripe.paymentIntents.update(id, {
            description: desc.join(", "),
        });
    }

    /**
     * Creates a new stripe customer
     * @param name customer name
     * @param email customer email
     * @returns customer object
     */
    private static async createCustomer(name: string, email?: string) {
        let customer = await stripe.customers.create({
            name,
            email,
        });
        return customer;
    }

    /**
     * Retrieves a customer by name and email
     * @param name customer name
     * @param email customer email
     * @returns customer object
     */
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
