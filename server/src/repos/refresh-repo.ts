import DefaultRepository from "../utils/defaults/default-repo";
import RefreshToken from "../models/refresh-token";

export default class RefreshTokenRepository extends DefaultRepository<RefreshToken> {
    constructor() {
        super(RefreshToken);
    }

    async add(token: string) {
        return await super.addToDB({ id: token });
    }

    async verifyToken(token: string) {
        return await super.findByID(token);
    }

    async delete(token: string) {
        return await super.delete(token);
    }
}
