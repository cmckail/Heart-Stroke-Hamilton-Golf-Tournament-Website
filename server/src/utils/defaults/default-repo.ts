import {
    getConnection,
    QueryFailedError,
    Repository,
    EntityTarget,
    FindManyOptions,
    FindOneOptions,
} from "typeorm";
import { ModelValidationError, NotFoundError } from "../errors";

export default class DefaultRepository<T> {
    private repo: Repository<T>;

    constructor(repo: EntityTarget<T>) {
        this.repo = getConnection().getRepository<T>(repo);
    }

    protected async addToDB(item: T | T[]) {
        try {
            if (Array.isArray(item)) {
                return await this.repo.save(item as T[]);
            } else {
                return await this.repo.save(item as T);
            }
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
        if (!result || result.length === 0)
            throw new NotFoundError(`Item not found (Options: ${options})`);
        return result;
    }

    protected async findByID(id: string) {
        const result = await this.repo.findOne(id);
        if (!result) throw new NotFoundError(`Item not found (ID: ${id})`);
        return result;
    }

    protected async findOne(options: FindOneOptions<T>) {
        const result = await this.repo.findOne(options);
        if (!result)
            throw new NotFoundError(`Item not found (Options: ${options})`);
        return result;
    }

    protected async delete(id: string | string[]) {
        let result: T[] = [];

        if (!Array.isArray(id)) id = [id];
        for (let i of id) {
            try {
                result.push(await this.findByID(i));
            } catch (e) {
                continue;
            }
        }

        if (!result || result.length === 0)
            throw new NotFoundError(`Item not found (ID: ${id})`);

        const resp = await this.repo.remove(result);

        return resp.length;
    }
}
