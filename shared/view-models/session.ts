import IDonationView from "./donation";
import IRegistrationView from "./registration";
import ISponsorView from "./sponsor";

export default interface SessionUserData {
    registration?: IRegistrationView[];
    donation?: IDonationView[];
    sponsor?: ISponsorView[];
}
