import DefaultRepository from "../utils/defaults/default-repo";
import Image from "../models/image";

export default class ImageRepository extends DefaultRepository<Image> {
    constructor() {
        super(Image);
    }

    async addToDB(image: Image) {
        return await super.addToDB(image);
    }

    async find(option: object) {
        return await super.find({ where: option });
    }

    async findByID(id: string) {
        return await super.findOne({ where: { id } });
    }

    async findByFileName(filename: string) {
        return await super.findOne({ where: { filename } });
    }
}
