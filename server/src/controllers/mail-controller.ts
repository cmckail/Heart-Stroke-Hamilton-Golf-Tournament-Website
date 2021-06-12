import Stripe from "stripe";
import Registration from "../models/registration";
import { mailerObj, emailFrom, emailTo } from "../config";
import path from "path";
import Email from "email-templates";

export default class MailController {
    public static async sendRegistrationInfo(
        id: string,
        registration: Registration[],
        customer: Stripe.Customer
    ) {
        let templatePath = path.join(
            __dirname,
            "../assets/mail-templates/registration"
        );
        new Email({
            message: {
                from: emailFrom,
                to: emailTo,
                subject: "New Registration Received",
            },
            send: true,
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
                    id,
                    name: customer.name,
                    email: customer.email,
                    registrations: registration,
                },
            })
            .then(console.log)
            .catch(console.error);
    }
    public static async sendSponsorHoleInfo(
        id: string,
        holes: number,
        customer: Stripe.Customer
    ) {
        let templatePath = path.join(
            __dirname,
            "../assets/mail-templates/sponsor-hole"
        );
        new Email({
            message: {
                from: emailFrom,
                to: emailTo,
                subject: "New Hole Sponsor Received",
            },
            send: true,
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
                    id,
                    name: customer.name,
                    email: customer.email,
                    hole: holes,
                },
            })
            .then(console.log)
            .catch(console.error);
    }
}
