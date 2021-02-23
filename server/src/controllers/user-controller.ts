import { Request, Response, NextFunction, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";
import UserRepository from "../repos/user-repo";
import { ForbiddenError, UnauthorizedError } from "../utils/errors";
import {
    env,
    accessLife,
    accessSecret,
    accessName,
    refreshLife,
    refreshSecret,
    refreshName,
} from "../config";
import RefreshTokenRepository from "../repos/refresh-repo";
import verifyUser, { generateNewTokens } from "../middlewares/verify-user";

const userRouter = Router();
const repo = new UserRepository();
const tokenRepo = new RefreshTokenRepository();

/**
 * User POST Route
 */
userRouter.post("/add", async (req, res, next) => {
    try {
        const result = await repo.addToDB(req.body as User);
        res.json(result);
    } catch (e) {
        next(e);
    }
});

userRouter.post("/login", async (req, res, next) => {
    try {
        const user: User = req.body;
        const retrievedUser = await repo.findUserByEmail(user.email);

        const correctPassword = await bcrypt.compare(
            user.password,
            retrievedUser.password
        );

        if (correctPassword) {
            const { accessToken, refreshToken } = generateNewTokens(user.email);

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
        next(e);
    }
});

userRouter.get("/logout", verifyUser, async (req, res, next) => {
    try {
        res.clearCookie(accessName);
        res.clearCookie(refreshName);
        res.status(200);
    } catch (e) {
        next(e);
    }
});

// const refreshPath = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const currentAccessToken = req.cookies[accessName];
//         const currentRefreshToken = req.cookies[refreshName];

//         let body = req.body;

//         console.log(body);

//         // access or refresh token missing
//         if (!currentAccessToken || !currentRefreshToken) {
//             throw new ForbiddenError();
//         }

//         try {
//             jwt.verify(currentRefreshToken, refreshSecret);
//         } catch (e) {
//             throw new UnauthorizedError();
//         }

//         let payload = jwt.decode(currentAccessToken) as {
//             user: string;
//             iat: number;
//             exp: number;
//         };
//         if (!("user" in payload) || payload.user === "") throw new Error();
//         tokenRepo.verifyToken(currentRefreshToken);

//         const {
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//         } = generateNewTokens(payload.user);

//         res.cookie(accessName, newAccessToken, {
//             secure: env === "production",
//             httpOnly: true,
//         });

//         res.cookie(refreshName, newRefreshToken, {
//             secure: env === "production",
//             httpOnly: true,
//         });

//         await tokenRepo.delete(currentRefreshToken);
//         await tokenRepo.add(newRefreshToken);

//         res.json({ msg: "ok" });
//     } catch (e) {
//         next(e);
//     }
// };

export default userRouter;
