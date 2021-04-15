/**
 * Mail router to send emails
 */
import { Router } from "express";
import MailController from "../../controllers/mail-controller";

const mailRouter = Router();

mailRouter.post("/send", MailController.send);

export default mailRouter;
