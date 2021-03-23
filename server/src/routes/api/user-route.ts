import { Router } from "express";
import verifyUser from "../../middlewares/verify-user";
import UserController from "../../controllers/user-controller";

const userRouter = Router();

/**
 * User POST Route
 */
userRouter.post("/add", UserController.add);

userRouter.post("/login", UserController.login);

userRouter.get("/logout", verifyUser, UserController.logout);

export default userRouter;
