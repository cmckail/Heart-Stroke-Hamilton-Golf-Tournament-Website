import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ForbiddenError, UnauthorizedError } from "../utils/errors/exceptions";

export default (req: Request, res: Response, next: NextFunction) => {
    let accessToken = req.cookies.jwt;

    if (!accessToken) {
        throw new ForbiddenError();
    }

    try {
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!);
        next();
    } catch (e) {
        throw new UnauthorizedError();
    }
};
