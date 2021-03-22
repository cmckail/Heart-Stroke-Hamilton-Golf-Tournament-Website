import { Router } from "express";
import ShoppingCartController from "../../controllers/shopping-cart-controller";

const cartRouter = Router();

cartRouter.get("/", ShoppingCartController.getCartItems);

export default cartRouter;
