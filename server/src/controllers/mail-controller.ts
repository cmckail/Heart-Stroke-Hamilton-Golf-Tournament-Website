import { Request, Response, NextFunction } from "express";
// import { MailOptions } from "nodemailer/lib/sendmail-transport";
import Stripe from "stripe";
import Registration from "../models/registration";
import { InvalidArgumentError } from "../utils/errors";
import { mailerObj } from "../config";
import path from "path";
import Email from "email-templates";

/**
 * Mail Controller
 * WORK IN PROGRESS
 */
export default class MailController {
    public static async sendRegistrationInfo(
        registration: Registration[],
        customer: Stripe.Customer
    ) {
        let templatePath = path.join(
            __dirname,
            "../assets/mail-templates/registration"
        );
        new Email({
            message: {
                from: "from@test.com",
                to: "testing@testing123.com",
                subject: "New Registration Received",
            },
            // send: true,
            transport: mailerObj,
            juiceResources: {
                webResources: {
                    relativeTo: templatePath,
                },
            },
        })
            .send({
                template: templatePath,
                locals: {
                    name: customer.name,
                    email: customer.email,
                    registrations: registration,
                },
            })
            .then(console.log)
            .catch(console.error);
    }

    // public static async send(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         let message: MailOptions = req.body;
    //         if (!message.subject || (!message.text && !message.html)) {
    //             throw new InvalidArgumentError();
    //         }

    //         let result = await mailerObj.sendMail(message);

    //         res.json({ msg: "message sent." });
    //     } catch (e) {
    //         console.error(e);
    //         next(e);
    //     }
    // }
}
