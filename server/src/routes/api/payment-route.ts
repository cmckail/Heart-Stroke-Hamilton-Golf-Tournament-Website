/**
 * Payment router to create or update current user session with payment intents
 */
import { Router } from "express";

import PaymentController from "../../controllers/payment-controller";

const paymentRouter = Router();

paymentRouter.post("/", PaymentController.createOrUpdatePaymentIntent);

paymentRouter.post("/customer", PaymentController.addCustomerToPaymentIntent);

paymentRouter.put("/success", PaymentController.paymentSuccessful);

export default paymentRouter;
