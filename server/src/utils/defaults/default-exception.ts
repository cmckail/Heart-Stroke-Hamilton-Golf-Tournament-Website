/**
 * Default HTTP Exception
 * Encompasses status code and error message
 */
export default class HttpException extends Error {
    statusCode: number;

    constructor(statusCode: number, message?: string) {
        super(message);
        this.statusCode = statusCode;
    }
}
