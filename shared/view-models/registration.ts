export default interface IRegistrationView {
    players: IPlayerView[];
    amount: number;
    teeTime?: Date;
}

export interface IPlayerView {
    firstName: string;
    lastName: string;
    mealChoice: string;
}
