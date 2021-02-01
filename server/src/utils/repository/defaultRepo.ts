import {
    getConnection,
    QueryFailedError,
    Repository,
    EntityTarget,
    FindManyOptions,
    FindOneOptions,
} from "typeorm";
import HttpException from "../errors/httpException";

export default class DefaultRepository<T> {
    private repo: Repository<T>;

    constructor(repo: EntityTarget<T>) {
        this.repo = getConnection().getRepository<T>(repo);
    }

    async addToDB(item: T) {
        try {
            return await this.repo.save(item);
        } catch (e) {
            switch (e.constructor) {
                case QueryFailedError:
                    throw new HttpException(400, "Invalid constraint.");
                default:
                    throw e;
            }
        }
    }

    async find(options: FindManyOptions<T>) {
        const result = await this.repo.find(options);
        if (!result || result.length === 0)
            throw new HttpException(404, "Item not found.");
        return result!;
    }

    async findOne(options: FindOneOptions<T>) {
        return (await this.find(options))[0];
    }
}
