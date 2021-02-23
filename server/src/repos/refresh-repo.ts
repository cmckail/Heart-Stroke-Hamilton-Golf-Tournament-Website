import DefaultRepository from "../utils/defaults/default-repo";
import RefreshToken from "../models/refresh-token";

export default class RefreshTokenRepository extends DefaultRepository<RefreshToken> {
    constructor() {
        super(RefreshToken);
    }

    /**
     * Adds a token to DB
     * @param token Token to add
     * @returns token added to DB
     * @throws `ModelValidationError` if token does not match validation rules
     */
    async add(token: string) {
        return await super.addToDB({ id: token });
    }

    /**
     * Verifies that a token is in DB
     * @param token Token to search
     * @returns true if token is in DB, false otherwise
     */
    async verifyToken(token: string) {
        try {
            return !!(await super.findByID(token));
        } catch (e) {
            return false;
        }
    }

    /**
     * Deletes a token from DB
     * @param token Token to delete
     * @returns number of rows affected
     * @throws `NotFoundError` if token is not found
     */
    async delete(token: string) {
        return await super.delete(token);
    }
}
