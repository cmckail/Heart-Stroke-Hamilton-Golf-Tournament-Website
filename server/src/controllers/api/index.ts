import imageRouter from "./image-controller";
import mailRouter from "./mail-controller";
import paymentRouter from "./payment-controller";
import registrationRouter from "./registration-controller";
import sponsorRouter from "./sponsor-controller";
import userRouter from "./user-controller";

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
];
