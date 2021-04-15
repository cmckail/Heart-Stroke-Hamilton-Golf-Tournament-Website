import IImageView from "./image";
import IItemView from "./item";

export default interface ISponsorView extends IItemView {
    name: string;
    description?: string;
    url?: string;
    logoURL?: string;
    logoData?: IImageView;
}
