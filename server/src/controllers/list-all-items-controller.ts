import {Router} from "express";
import Stripe from "stripe";

const listItemsRouter = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
apiVersion:"2020-08-27",
typescript:true


});

listItemsRouter.get("/vi/products", async (req, res) =>{
    console.log(res.json);
    const products = await stripe.products.list({
    
    });
});