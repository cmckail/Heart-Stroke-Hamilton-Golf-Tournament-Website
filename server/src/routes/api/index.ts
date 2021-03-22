import donationRouter from "./donation-route";
import imageRouter from "./image-route";
import mailRouter from "./mail-route";
import paymentRouter from "./payment-route";
import registrationRouter from "./registration-route";
import cartRouter from "./shopping-cart-route";
import sponsorRouter from "./sponsor-route";
import userRouter from "./user-route";
import webhookRouter from "./webhook-route";

export default [
    {
        route: "/images",
        router: imageRouter,
    },
    {
        route: "/payment",
        router: paymentRouter,
    },
    {
        route: "/users",
        router: userRouter,
    },
    {
        route: "/mail",
        router: mailRouter,
    },
    {
        route: "/sponsors",
        router: sponsorRouter,
    },
    {
        route: "/registration",
        router: registrationRouter,
    },
    {
        route: "/webhook",
        router: webhookRouter,
    },
    {
        route: "/cart",
        router: cartRouter,
    },
    {
        route: "/donations",
        router: donationRouter,
    },
];