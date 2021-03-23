import { Router } from "express";

import PaymentController from "../../controllers/payment-controller";

const paymentRouter = Router();

paymentRouter.post(
    "/create-payment-intent",
    PaymentController.createPaymentIntent
);

export default paymentRouter;
