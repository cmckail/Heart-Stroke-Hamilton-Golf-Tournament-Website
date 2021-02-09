import bcrypt from "bcrypt";

import DefaultRepository from "../utils/defaults/default-repo";
import User from "../models/user";

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

        const res = await this.delete(user.id!);

        return Boolean(res.affected && res.affected > 0);
    }
}
