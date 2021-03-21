import Sponsor from "@local/shared/models/sponsor";
import { SessionData } from "express-session";
import Stripe from "stripe";

declare module "express-session" {
    interface SessionData {
        sponsor: Sponsor;
    }
}
