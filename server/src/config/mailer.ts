import SMTPTransport from "nodemailer/lib/smtp-transport";

let transportObj: SMTPTransport.Options;

if (process.env.NODE_ENV !== "production") {
    transportObj = {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
        },
    };
} else {
    transportObj = {};
}

export default transportObj;
