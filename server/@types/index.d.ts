import Registration from "@local/shared/models/registration";
import Sponsor from "@local/shared/models/sponsor";
import IDonationView from "@local/shared/view-models/donation";
import IRegistrationView from "@local/shared/view-models/registration";
import ISponsorView from "@local/shared/view-models/sponsor";
import { SessionData } from "express-session";
import Stripe from "stripe";

declare module "express-session" {
    interface SessionData {
        data: SessionUserData;
    }
}

interface SessionUserData {
    registration?: IRegistrationView[];
    donation?: IDonationView[];
    sponsor?: ISponsorView[];
}
