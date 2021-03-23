import { Request, Response, NextFunction } from "express";
import { MailOptions } from "nodemailer/lib/sendmail-transport";
import { InvalidArgumentError } from "../utils/errors";
import transport from "../utils/mailer";

export default class MailController {
    public static async send(req: Request, res: Response, next: NextFunction) {
        try {
            let message: MailOptions = req.body;
            if (!message.subject || (!message.text && !message.html)) {
                throw new InvalidArgumentError();
            }

            let result = await transport.sendMail(message);

            res.json({ msg: "message sent." });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }
}
