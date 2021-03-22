import IItemView from "./item";
import IPersonView from "./person";

export default interface IRegistrationView extends IItemView {
    players: IPlayerView[];
    teeRange: string;
}

export interface IPlayerView {
    player: IPersonView;
    mealChoice: string;
}
