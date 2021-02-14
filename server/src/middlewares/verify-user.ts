import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { ForbiddenError, UnauthorizedError } from "../utils/errors";
import { accessSecret } from "../config";

export default (req: Request, res: Response, next: NextFunction) => {
    let accessToken = req.cookies.jwt;

    if (!accessToken) {
        throw new ForbiddenError();
    }

    try {
        jwt.verify(accessToken, accessSecret);
        next();
    } catch (e) {
        throw new UnauthorizedError();
    }
};
