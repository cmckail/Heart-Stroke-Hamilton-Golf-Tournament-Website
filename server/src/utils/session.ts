import IItemView from "@local/shared/view-models/item";
import IRegistrationView from "@local/shared/view-models/registration";
import IDonationView from "@local/shared/view-models/donation";
import { Request } from "express";
import { SessionUserData } from "../../@types";

export default function addToSession(req: Request, data: IItemView) {
    let key: keyof SessionUserData;
    if (isRegistration(data)) {
        key = "registration";
    } else if (isDonation(data)) {
        key = "donation";
    } else {
        throw new Error();
    }

    if (!req.session.data) {
        req.session.data = {};
    }

    let array =
        !Array.isArray(req.session.data[key]) ||
        req.session.data[key]?.length === 0
            ? [data]
            : [...req.session.data[key]!, data];

    Object.assign(req.session.data, { [key]: array });
}

const isRegistration = (data: IItemView): data is IRegistrationView => {
    return (
        (<IRegistrationView>data).players &&
        (<IRegistrationView>data).players.length > 0
    );
};

const isDonation = (data: IItemView): data is IDonationView => {
    return !!(<IDonationView>data).donor;
};
