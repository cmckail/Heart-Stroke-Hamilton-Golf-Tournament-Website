import HttpException from "../defaults/default-exception";

export class UnauthorizedError extends HttpException {
    constructor(message?: string) {
        super(401, message || "User is unauthorized.");
    }
}

export class ForbiddenError extends HttpException {
    constructor(message?: string) {
        super(403, message || "User is forbidden.");
    }
}

export class ModelValidationError extends HttpException {
    constructor(message?: string) {
        super(400, message || "Item does not fit model validation rules.");
    }
}

export class NotFoundError extends HttpException {
    constructor(message?: string) {
        super(404, message || "Item not found.");
    }
}

export class InvalidArgumentError extends HttpException {
    constructor(message?: string) {
        super(400, message || "Invalid arguments given.");
    }
}
