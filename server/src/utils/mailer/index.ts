import nodemailer from "nodemailer";
import transportObj from "../../config/mailer";

const transport = nodemailer.createTransport(transportObj);

export default transport;
