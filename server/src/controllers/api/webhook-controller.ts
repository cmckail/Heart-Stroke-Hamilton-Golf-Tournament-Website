import { Router } from "express";
import Stripe from "stripe";

const webhookRouter = Router();

webhookRouter.post("/webhook", (req, res, next) => {
    const event: Stripe.Event = req.body;

    switch (event.type) {
    }
});

export default webhookRouter;
