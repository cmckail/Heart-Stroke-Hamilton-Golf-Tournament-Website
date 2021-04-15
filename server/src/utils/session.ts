import IItemView from "@local/shared/view-models/item";
import IRegistrationView from "@local/shared/view-models/registration";
import IDonationView from "@local/shared/view-models/donation";
import { v4 as uuid } from "uuid";
import { Request } from "express";
import SessionUserData from "@local/shared/view-models/session";

/**
 * Adds an item to session
 * @param req express request
 * @param data session user data
 */
export default function addToSession(req: Request, data: IItemView) {
    // Finds type of data
    let key: keyof SessionUserData;
    if (isRegistration(data)) {
        key = "registration";
    } else if (isDonation(data)) {
        key = "donation";
    } else {
        throw new Error();
    }

    // Creates new data session if none exists
    if (!req.session.data) {
        req.session.data = {};
    }

    // Adds id to data
    data.id = uuid();

    // Creates data array to insert to session
    let array =
        !Array.isArray(req.session.data[key]) ||
        req.session.data[key]?.length === 0
            ? [data]
            : [...req.session.data[key]!, data];

    // Add data to session
    Object.assign(req.session.data, { [key]: array });
}

/**
 * Deletes an item from session
 * @param req express request
 * @param id session id
 */
export function deleteFromSession(req: Request, id: string) {
    // no session data found
    if (!req.session.data) return;

    Object.keys(req.session.data).forEach((item) => {
        let key = item as keyof SessionUserData;
        if (
            req.session.data[key] &&
            !(req.session.data[key] as any[]).every((value) => value.id != id)
        ) {
            req.session.data[key] = (req.session.data[key] as any[]).filter(
                (value) => value.id != id
            );
        }
    });
}

/**
 * Checks if item is registration
 * @param data session item
 * @returns if item is registration
 */
const isRegistration = (data: IItemView): data is IRegistrationView => {
    return (
        (<IRegistrationView>data).players &&
        (<IRegistrationView>data).players.length > 0
    );
};

/**
 * Checks if item is donation
 * @param data session item
 * @returns if item is donation
 */
const isDonation = (data: IItemView): data is IDonationView => {
    return !!(<IDonationView>data).donor;
};
