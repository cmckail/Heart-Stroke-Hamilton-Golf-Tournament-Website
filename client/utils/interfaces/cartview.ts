import IDonationView from "@local/shared/view-models/donation";
import IRegistrationView from "@local/shared/view-models/registration";

export default interface ICartView {
    registration?: IRegistrationView[];
    donation?: IDonationView[];
}
