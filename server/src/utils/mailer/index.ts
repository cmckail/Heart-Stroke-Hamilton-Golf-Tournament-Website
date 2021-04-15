import nodemailer from "nodemailer";
import transportObj from "../../config/mailer";

/**
 * Creates a new mailer object
 * WORK IN PROGRESS
 */
const transport = nodemailer.createTransport(transportObj);

export default transport;
