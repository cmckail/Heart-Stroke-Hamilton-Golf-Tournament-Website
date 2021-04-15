import { Request, Response, NextFunction } from "express";
import IItemView from "@local/shared/view-models/item";
import { deleteFromSession } from "../utils/session";

/**
 * Shopping cart controller
 */
export default class ShoppingCartController {
    /**
     * Retrieves all items in cart
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    public static async getCartItems(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let response = req.session.data;
            res.json(response);
        } catch (e) {
            next(e);
        }
    }

    /**
     * deletes item from cart
     * @param req express request
     * @param res express response
     * @param next express next function
     */
    public static async deleteFromCart(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            // let data: IItemView = req.body;
            deleteFromSession(req, req.params.id);
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
}
