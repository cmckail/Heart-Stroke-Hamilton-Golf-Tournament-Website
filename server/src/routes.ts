import { Router, Request, Response, NextFunction } from "express";

import apiControllers from "./controllers/api";
import controllers from "./controllers/non-api";
import HttpException from "./utils/defaults/default-exception";
import { env, logger } from "./config";

const router = Router();
const apiRouter = Router();
const defaultErrorMessage =
    "Something went wrong. Please try again or contact support.";

apiRouter.get("/", (req, res, next) => {
    res.json({ msg: "Connection successful." });
});

apiControllers.forEach((item) => {
    apiRouter.use(item.route, item.router);
});

controllers.forEach((item) => {
    router.use(item.route, item.router);
});

const errorHandler = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const message = err.message || defaultErrorMessage;
    const statusCode = err.statusCode || 500;
    logger.error(
        env === "development" || env === "test"
            ? err.stack
            : `[${statusCode}] - ${err.message || "Unknown error"}}`
    );

    res.status(statusCode).json({ statusCode, message });
};

// Handle error
router.use(errorHandler);
apiRouter.use(errorHandler);

module.exports = { router, apiRouter };
