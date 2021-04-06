import Registration from "../src/models/registration";
import Sponsor from "../models/sponsor";
import SessionUserData from "@local/shared/view-models/session";
import { SessionData } from "express-session";
import Stripe from "stripe";

declare module "express-session" {
    interface SessionData {
        paymentIntent?: string;
        data: SessionUserData;
    }
}
