import { Request, Response, NextFunction } from "express";

export default class ShoppingCartController {
    public static async getCartItems(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        let response = req.session.data;
        res.json(response);
    }
}
