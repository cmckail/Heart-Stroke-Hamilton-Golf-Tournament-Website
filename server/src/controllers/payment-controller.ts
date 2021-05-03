import IPersonView from "@local/shared/view-models/person";
import SessionUserData from "@local/shared/view-models/session";
import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { stripe } from "../config";
export default class PaymentController {
    public static async createCheckoutSession(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let products = (await stripe.products.list({ active: true })).data;
            let prices = (await stripe.prices.list({ active: true })).data;

            let registrationProd = products.find(
                (x) => x.name.toLowerCase() === "registration"
            );
            let registrationPrice = prices.find(
                (x) => x.product === registrationProd.id
            );

            let donationProd = products.find(
                (x) => x.name.toLowerCase() === "donation"
            );

            let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

            if (req.session.data.donation) {
                req.session.data.donation.forEach((item) => {
                    let lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
                        price_data: {
                            currency: "cad",
                            product: donationProd.id,
                            unit_amount: item.amount,
                        },
                        quantity: 1,
                    };
                    lineItems.push(lineItem);
                });
            }

            if (req.session.data.registration) {
                req.session.data.registration.forEach((item) => {
                    let lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
                        price: registrationPrice.id,
                        quantity: item.players.length,
                        description: `${item.players.length} player${
                            item.players.length > 1 ? "s" : ""
                        }`,
                    };
                    lineItems.push(lineItem);
                });
            }

            // Customer
            let { firstName, lastName, email } = req.body as IPersonView;
            let name = firstName + " " + lastName;
            let customer =
                (await PaymentController.findCustomerByName(name, email)) ||
                (await PaymentController.createCustomer(name, email));

            const session = await stripe.checkout.sessions.create({
                cancel_url: "http://localhost:3000/shoppingCart",
                success_url: "http://localhost:3000/success",
                payment_method_types: ["card"],
                customer: customer.id,
                mode: "payment",
                line_items: lineItems,
            });

            await PaymentController.updateDescription(
                session.payment_intent as string,
                req.session.data
            );

            res.json({ id: session.id });
        } catch (e) {
            next(e);
        }
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
}
