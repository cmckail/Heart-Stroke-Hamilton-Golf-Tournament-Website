import { FindManyOptions } from "typeorm";
import Photo from "../models/photo";
import DefaultRepository from "../utils/defaults/default-repo";

export default class PhotoRepository extends DefaultRepository<Photo> {
    constructor() {
        super(Photo);
    }

    public async find(options: FindManyOptions<Photo>) {
        return await super.find(options);
    }

    public async addToDB(item: Photo | Photo[]) {
        return await super.addToDB(item);
    }
}
