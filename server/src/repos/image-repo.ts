import DefaultRepository from "../utils/defaults/default-repo";
import Image from "../models/image";

export default class ImageRepository extends DefaultRepository<Image> {
    constructor() {
        super(Image);
    }

    async addToDB(image: Image | Image[]) {
        return await super.addToDB(image);
    }

    async find(option: object) {
        return await super.find({ where: option });
    }

    async findByID(id: string) {
        return await super.findByID(id);
    }

    async findByPublicID(id: string) {
        return await super.findOne({ where: { publicId: id } });
    }

    async findByFileName(filename: string) {
        return await super.findOne({ where: { filename } });
    }

    async delete(id: string) {
        return await super.delete(id);
    }
}
