import * as connection from "./db";
import transportObj from "./mailer";
import loggerObj from "../utils/logger";

const Config = {
    /**
     * Application environment
     */
    env: process.env.NODE_ENV!,
    /**
     * Application port
     */
    port: parseInt(process.env.PORT!),
    /**
     * Connection object to database
     */
    connectionObj: connection.default,
    /**
     * Mailer object to nodemailer
     */
    mailerObj: transportObj,
    /**
     * Stripe secret key
     */
    stripeSecret: process.env.STRIPE_SECRET_KEY!,
    /**
     * JWT access token secret key
     */
    accessSecret: process.env.ACCESS_TOKEN_SECRET!,
    /**
     * JWT access token life in seconds
     */
    accessLife: parseInt(process.env.ACCESS_TOKEN_LIFE!),
    /**
     * JWT access token name
     */
    accessName: process.env.ACCESS_TOKEN_NAME!,
    /**
     * JWT refresh token secret key
     */
    refreshSecret: process.env.REFRESH_TOKEN_SECRET!,
    /**
     * JWT refresh token life in seconds
     */
    refreshLife: parseInt(process.env.REFRESH_TOKEN_LIFE!),
    /**
     * JWT refresh token name
     */
    refreshName: process.env.REFRESH_TOKEN_NAME!,
    /**
     * Application base URL
     */
    baseURL: process.env.BASE_URL!,
    /**
     * Logger object
     */
    logger: loggerObj,
};

export const {
    env,
    port,
    mailerObj,
    connectionObj,
    stripeSecret,
    accessSecret,
    accessLife,
    accessName,
    refreshLife,
    refreshSecret,
    refreshName,
    baseURL,
    logger,
} = Config;

export default Config;
