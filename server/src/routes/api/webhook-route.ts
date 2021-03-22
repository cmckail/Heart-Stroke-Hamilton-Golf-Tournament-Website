import { Router } from "express";

import WebhookController from "../../controllers/webhook-controller";

const webhookRouter = Router();

webhookRouter.post("/", WebhookController.invoke);

export default webhookRouter;
