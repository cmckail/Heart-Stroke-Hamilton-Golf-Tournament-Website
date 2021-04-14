import { createLogger, format, transports } from "winston";

/**
 * Creates a new logger object
 * WORK IN PROGRESS
 */
export default createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true })
    ),
    transports: [
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        }),
    ],
});
