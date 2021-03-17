import Sponsor from "@local/shared/models/sponsor";
import { SessionData } from "express-session";

declare module "express-session" {
    interface SessionData {
        sponsor: { paid: boolean; data: Sponsor };
    }
}
