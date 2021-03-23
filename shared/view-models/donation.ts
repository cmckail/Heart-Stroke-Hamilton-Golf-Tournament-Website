import IItemView from "./item";
import IPersonView from "./person";

export default interface IDonationView extends IItemView {
    donor: IPersonView;
}
