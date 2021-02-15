import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { ForbiddenError, UnauthorizedError } from "../utils/errors";
import {
    accessSecret,
    refreshSecret,
    accessName,
    refreshName,
    logger,
} from "../config";

export default (req: Request, res: Response, next: NextFunction) => {
    let accessToken = req.cookies[accessName];
    let refreshToken = req.cookies[refreshName];

    // access or refresh token missing
    if (!accessToken || !refreshToken) {
        throw new ForbiddenError();
    }

    try {
        jwt.verify(accessToken, accessSecret);
        next();
    } catch (e) {
        switch (e.constructor) {
            case TokenExpiredError:
                jwt.verify(refreshToken, refreshSecret);
                // if (!res.hasHeader("Referer")) {
                //     res.header("Hello-World", "test");
                // }
                res.redirect(303, "http://localhost:5000/api/users/refresh");
                break;
            default:
                console.error(e);
                throw new UnauthorizedError();
        }
    }
};
