import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";
import UserRepository from "../repos/user-repo";
import { ForbiddenError, UnauthorizedError } from "../utils/errors/exceptions";

const userRouter = Router();
const repo = new UserRepository();

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
            let payload = { user: user.email };
            let accessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET!,
                {
                    expiresIn: process.env.ACCESS_TOKEN_LIFE!,
                }
            );
            let refreshToken = jwt.sign(
                payload,
                process.env.REFRESH_TOKEN_SECRET!,
                {
                    expiresIn: process.env.REFRESH_TOKEN_LIFE!,
                }
            );

            res.cookie("accessToken", accessToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
            });

            res.cookie("refreshToken", refreshToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
            });

            res.json({ msg: "ok" });
        } else {
            throw new UnauthorizedError("Incorrect password.");
        }
    } catch (e) {
        next(e);
    }
});

userRouter.get("/refresh", async (req, res, next) => {
    try {
        let accessToken = req.cookies.accessToken;

        if (!accessToken) {
            throw new ForbiddenError();
        }

        try {
            let payload = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET!
            );
            let refreshToken = req.cookies.refreshToken;

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);

            let newAccessToken = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET!,
                {
                    expiresIn: process.env.ACCESS_TOKEN_LIFE!,
                }
            );

            res.cookie("accessToken", accessToken, {
                secure: process.env.NODE_ENV === "production",
                httpOnly: true,
            });

            res.json({ msg: "ok" });
        } catch (e) {
            throw new UnauthorizedError();
        }
    } catch (e) {
        next(e);
    }
});

export default userRouter;
