import Stripe from "stripe";

/**
 * Stripe config
 */

export default new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2020-08-27",
    typescript: true,
});
