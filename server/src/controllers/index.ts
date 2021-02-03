import imageRouter from "./image-controller";
import paymentRouter from "./payment-controller";

export default [
    {
        route: "/images",
        router: imageRouter,
    },
    {
        route: "/payment",
        router: paymentRouter,
    },
];
