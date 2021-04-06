import { Request, Response, NextFunction } from "express";
import IItemView from "@local/shared/view-models/item";
import { deleteFromSession } from "../utils/session";

export default class ShoppingCartController {
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
