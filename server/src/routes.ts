import { Router, Request, Response, NextFunction } from "express";
import imageRouter from "./controllers/imageController";
import HttpException from "./utils/errors/httpException";
import logger from "./utils/logger/logger";
const router = Router();
const defaultErrorMessage =
    "Something went wrong. Please try again or contact support.";

router.get("/", (req, res) => {
    res.json({ msg: "Connection successful." });
});

router.use("/images", imageRouter);

// Handle error
router.use(
    (err: HttpException, req: Request, res: Response, next: NextFunction) => {
        const message = err.message || defaultErrorMessage;
        const statusCode = err.statusCode || 500;
        logger.error(
            process.env.NODE_ENV === "development" ||
                process.env.NODE_ENV === "test"
                ? err.stack
                : `[${statusCode}] - ${err.message || "Unknown error"}}`
        );
        // logger.error(err.stack);

        res.status(statusCode).json({ statusCode, message });
    }
);

module.exports = router;
