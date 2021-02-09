import imageRouter from "./image-controller";
import paymentRouter from "./payment-controller";
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
];
