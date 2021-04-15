/**
 * Methods for the Sponor page, contains addind, deleting, updating, and finding methods
 */
import { FindManyOptions } from "typeorm";
import Sponsor from "../models/sponsor";
import DefaultRepository from "../utils/defaults/default-repo";

export default class SponsorRepository extends DefaultRepository<Sponsor> {
    constructor() {
        super(Sponsor);
    }

    public async addToDB(sponsor: Sponsor) {
        return (await super.addToDB(sponsor)) as Sponsor;
    }

    public async find(options: FindManyOptions<Sponsor>) {
        options.relations = ["logo"];
        return await super.find(options);
    }

    public async findByID(id: string) {
        return await super.findByID(id, { relations: ["logo"] });
    }

    public async update(id: string, newSponsor: Sponsor) {
        return await super.update(id, newSponsor);
    }

    public async delete(id: string) {
        return await super.delete(id);
    }
}
