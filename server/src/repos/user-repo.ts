import bcrypt from "bcrypt";

import DefaultRepository from "../utils/defaults/default-repo";
import User from "@local/shared/models/user";

export default class UserRepository extends DefaultRepository<User> {
    private saltRounds = 10;
    constructor() {
        super(User);
    }

    async addToDB(user: User) {
        user.password = await bcrypt.hash(user.password, this.saltRounds);
        return await super.addToDB(user);
    }

    async findUserByEmail(email: string) {
        return (await super.find({ where: { email } }))[0];
    }

    async deleteUser(email: string) {
        const user = await this.findUserByEmail(email);

        return await this.delete(user.id!);
    }
}
