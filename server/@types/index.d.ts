import Registration from "@local/shared/models/registration";
import Sponsor from "@local/shared/models/sponsor";
import IRegistrationView from "@local/shared/view-models/registration";
import { SessionData } from "express-session";
import Stripe from "stripe";

declare module "express-session" {
    interface SessionData {
        sponsor: Sponsor | Sponsor[];
        registration: IRegistrationView | IRegistrationView[];
    }
}
