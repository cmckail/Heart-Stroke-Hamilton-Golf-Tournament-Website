import DefaultRepository from "../utils/defaults/default-repo";
import Registration from "../models/registration";

export default class RegistrationRepository extends DefaultRepository<Registration> {
    constructor() {
        super(Registration);
    }

    public async addToDB(item: Registration) {
        return await super.addToDB(item);
    }
}
