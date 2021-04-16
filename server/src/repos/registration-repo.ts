/**
 *Method to add registered users to the database
 */
import DefaultRepository from "../utils/defaults/default-repo";
import Registration from "../models/registration";
import { FindOneOptions } from "typeorm";

export default class RegistrationRepository extends DefaultRepository<Registration> {
    constructor() {
        super(Registration);
    }

    public async addToDB(item: Registration) {
        return await super.addToDB(item);
    }

    public async findByID(id: string, options?: FindOneOptions<Registration>) {
        return await super.findByID(id, options);
    }
}
