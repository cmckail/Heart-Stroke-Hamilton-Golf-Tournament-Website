import {
    getConnection,
    QueryFailedError,
    Repository,
    EntityTarget,
    FindManyOptions,
    FindOneOptions,
} from "typeorm";
import { ModelValidationError, NotFoundError } from "../errors/exceptions";

export default class DefaultRepository<T> {
    private repo: Repository<T>;

    constructor(repo: EntityTarget<T>) {
        this.repo = getConnection().getRepository<T>(repo);
    }

    protected async addToDB(item: T) {
        try {
            return await this.repo.save(item);
        } catch (e) {
            switch (e.constructor) {
                case QueryFailedError:
                    throw new ModelValidationError();
                default:
                    throw e;
            }
        }
    }

    protected async find(options: FindManyOptions<T>) {
        const result = await this.repo.find(options);
        if (!result || result.length === 0) throw new NotFoundError();
        return result!;
    }

    protected async findOne(options: FindOneOptions<T>) {
        return (await this.find(options))[0];
    }

    protected async delete(id: string) {
        return await this.repo.delete(id);
    }
}
