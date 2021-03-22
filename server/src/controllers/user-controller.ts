import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

import User from "@local/shared/models/user";
import UserRepository from "../repos/user-repo";
import { ForbiddenError, UnauthorizedError } from "../utils/errors";
import { env, accessName, refreshName } from "../config";
import RefreshTokenRepository from "../repos/refresh-repo";
import { generateNewTokens } from "../middlewares/verify-user";

const repo = new UserRepository();
const tokenRepo = new RefreshTokenRepository();

export default class UserController {
    public static async add(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await repo.addToDB(req.body as User);
            res.json(result);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const user: User = req.body;
            const retrievedUser = await repo.findUserByEmail(user.email);

            const correctPassword = await bcrypt.compare(
                user.password,
                retrievedUser.password
            );

            if (correctPassword) {
                const { accessToken, refreshToken } = generateNewTokens(
                    user.email
                );

                res.cookie(accessName, accessToken, {
                    secure: env === "production",
                    httpOnly: true,
                });

                res.cookie(refreshName, refreshToken, {
                    secure: env === "production",
                    httpOnly: true,
                });

                await tokenRepo.add(refreshToken);

                res.json({ msg: "ok" });
            } else {
                throw new UnauthorizedError("Incorrect password.");
            }
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public static async logout(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            res.clearCookie(accessName);
            res.clearCookie(refreshName);
            res.status(200);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }
}
