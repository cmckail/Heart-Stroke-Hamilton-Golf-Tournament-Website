import { Router } from "express";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { InvalidArgumentError } from "../../utils/errors";
import transport from "../../utils/mailer";

const mailRouter = Router();

mailRouter.post("/send", async (req, res, next) => {
    try {
        let message: MailOptions = req.body;
        if (!message.subject || (!message.text && !message.html)) {
            throw new InvalidArgumentError();
        }

        let result = await transport.sendMail(message);

        res.json({ msg: "message sent." });
    } catch (e) {
        next(e);
    }
});

export default mailRouter;
