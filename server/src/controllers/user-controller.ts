import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user";
import UserRepository from "../repos/user-repo";
import { ForbiddenError, UnauthorizedError } from "../utils/errors";
import {
    env,
    accessLife,
    accessSecret,
    refreshLife,
    refreshSecret,
} from "../config";

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
            let accessToken = jwt.sign(payload, accessSecret, {
                expiresIn: accessLife,
            });
            let refreshToken = jwt.sign(payload, refreshSecret, {
                expiresIn: refreshLife,
            });

            res.cookie("accessToken", accessToken, {
                secure: env === "production",
                httpOnly: true,
            });

            res.cookie("refreshToken", refreshToken, {
                secure: env === "production",
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
            let payload = jwt.verify(accessToken, accessSecret);
            let refreshToken = req.cookies.refreshToken;

            jwt.verify(refreshToken, refreshSecret);

            let newAccessToken = jwt.sign(payload, accessSecret, {
                expiresIn: accessLife,
            });

            res.cookie("accessToken", accessToken, {
                secure: env === "production",
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
