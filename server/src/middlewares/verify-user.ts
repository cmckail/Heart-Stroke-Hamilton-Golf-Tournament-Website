import jwt, { TokenExpiredError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import { ForbiddenError, UnauthorizedError } from "../utils/errors";
import {
    accessSecret,
    refreshSecret,
    accessName,
    refreshName,
    logger,
    accessLife,
    refreshLife,
    env,
} from "../config";

import RefreshTokenRepository from "../repos/refresh-repo";
import UserRepository from "../repos/user-repo";

const tokenRepo = new RefreshTokenRepository();
const userRepo = new UserRepository();

/**
 * Generates new JWT tokens
 * @param email user email
 * @returns JWT tokens
 */
export const generateNewTokens = (email: string) => {
    let payload = { user: email };
    let accessToken = jwt.sign(payload, accessSecret, {
        expiresIn: accessLife,
    });
    let refreshToken = jwt.sign(payload, refreshSecret, {
        expiresIn: refreshLife,
    });
    return { accessToken, refreshToken };
};

/**
 * Verifies user from JWT
 * @param req express request
 * @param res express response
 * @param next express next function
 */
const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentAccessToken = req.cookies[accessName];
        const currentRefreshToken = req.cookies[refreshName];

        // access or refresh token missing
        if (!currentAccessToken || !currentRefreshToken) {
            throw new ForbiddenError();
        }

        // Verifies access token validity, checks refresh token if access token is expired
        try {
            jwt.verify(currentAccessToken, accessSecret);
            next();
        } catch (e) {
            switch (e.constructor) {
                case TokenExpiredError:
                    logger.debug("Token expired. Refreshing...");
                    // Verifies refresh token still valid
                    try {
                        jwt.verify(currentRefreshToken, refreshSecret);
                    } catch (e) {
                        throw new UnauthorizedError();
                    }

                    // Decodes access token payload
                    let payload = jwt.decode(currentAccessToken) as {
                        user: string;
                        iat: number;
                        exp: number;
                    };

                    // If user string is empty
                    if (!("user" in payload) || payload.user === "")
                        throw new UnauthorizedError();

                    // Checks user email against DB
                    try {
                        await userRepo.findUserByEmail(payload.user);
                    } catch (e) {
                        throw new UnauthorizedError();
                    }

                    // Verify refresh token is valid in DB
                    if (await tokenRepo.verifyToken(currentRefreshToken)) {
                        const {
                            accessToken: newAccessToken,
                            refreshToken: newRefreshToken,
                        } = generateNewTokens(payload.user);

                        res.cookie(accessName, newAccessToken, {
                            secure: env === "production",
                            httpOnly: true,
                        });
                        res.cookie(refreshName, newRefreshToken, {
                            secure: env === "production",
                            httpOnly: true,
                        });

                        await tokenRepo.delete(currentRefreshToken);
                        await tokenRepo.add(newRefreshToken);

                        next();
                    } else {
                        throw new UnauthorizedError();
                    }
                    break;
                default:
                    throw new UnauthorizedError();
            }
        }
    } catch (e) {
        next(e);
    }
};

export default verifyUser;
