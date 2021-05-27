import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";

/**
 * Mail options object
 */

let transportObj: SMTPTransport.Options;

if (process.env.NODE_ENV !== "production") {
    transportObj = {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASS!,
        },
    };
} else {
    transportObj = {
        host: "maail.ddsmemoriaal.ca",
        port: 465,
        auth: {
            user: process.env.EMAIL_USER!,
            pass: process.env.EMAIL_PASS!,
        },
    };
}

export default nodemailer.createTransport(transportObj);
