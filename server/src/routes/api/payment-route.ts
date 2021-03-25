import { Router } from "express";

import PaymentController from "../../controllers/payment-controller";

const paymentRouter = Router();

paymentRouter.post("/", PaymentController.createOrUpdatePaymentIntent);

export default paymentRouter;
