import { Router } from "express";
import Stripe from "stripe";

const paymentIntentRouter = Router();



paymentIntentRouter.post('/', async (req, res, next) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2020-08-27",
        typescript: true,
    });
    // TO ADD: data validation, storing errors in an `errors` variable!
    const name = req.body.name;
    const email = req.body.email;
    const amount = req.body.amount;
    if (true) { 
      try {
       
        // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100, 
          currency: 'cad',
          receipt_email: email,
        });
        res.render('card', {name: name, amount: amount, intentSecret: paymentIntent.client_secret });
      } catch(err) {
        console.log('Error! ', err.message);
      }
    } else {
      res.render('donate', { title: 'Donate', errors: Error });
    }
  });

export default paymentIntentRouter;
