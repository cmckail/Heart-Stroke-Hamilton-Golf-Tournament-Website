import IItemViewModel from "./item";

export default interface IRegistrationView extends IItemViewModel {
    players: IPlayerView[];
    teeTime?: Date;
}

export interface IPlayerView {
    firstName: string;
    lastName: string;
    mealChoice: string;
}
