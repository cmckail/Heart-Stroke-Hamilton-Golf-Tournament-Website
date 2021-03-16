import {
    getConnection,
    QueryFailedError,
    Repository,
    EntityTarget,
    FindManyOptions,
    FindOneOptions,
} from "typeorm";
import { ModelValidationError, NotFoundError } from "../errors";

export default abstract class DefaultRepository<T> {
    private repo: Repository<T>;

    constructor(repo: EntityTarget<T>) {
        this.repo = getConnection().getRepository<T>(repo);
    }

    /**
     * Adds given item(s) to DB
     * @param item item(s) to add
     * @returns The added item(s)
     * @throws `ModelValidationError` if item does not match validation rules
     */
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

    /**
     * Searches through DB given a set of options
     * @param {FindManyOptions} options Syntax found [here](https://typeorm.delightful.studio/interfaces/_find_options_findmanyoptions_.findmanyoptions.html)
     * @returns Array of items
     * @throws `NotFoundError` if no items are found
     */
    protected async find(options: FindManyOptions<T>) {
        const result = await this.repo.find(options);
        if (!result || result.length === 0)
            throw new NotFoundError(`Item not found (Options: ${options})`);
        return result;
    }

    /**
     * Searches the item with the given ID
     * @param id id of item
     * @param options Syntax found [here](https://typeorm.delightful.studio/interfaces/_find_options_findoneoptions_.findoneoptions.html)
     * @returns item with given ID
     * @throws `NotFoundError` if no items are found
     */
    protected async findByID(id: string, options?: FindOneOptions<T>) {
        const result = await this.repo.findOne(id, options);
        if (!result) throw new NotFoundError(`Item not found (ID: ${id})`);
        return result;
    }

    /**
     * Searches through DB given a set of options
     * @param options Syntax found [here](https://typeorm.delightful.studio/interfaces/_find_options_findoneoptions_.findoneoptions.html)
     * @returns the first item found
     * @throws `NotFoundError` if no items are found
     */
    protected async findOne(options: FindOneOptions<T>) {
        const result = await this.repo.findOne(options);
        if (!result)
            throw new NotFoundError(`Item not found (Options: ${options})`);
        return result;
    }

    /**
     * Updates the item with the given ID
     * @param id id of item
     * @param newItem data of item to be updated
     * @param options Syntax found [here](https://typeorm.delightful.studio/interfaces/_find_options_findoneoptions_.findoneoptions.html)
     * @returns the updated item
     */
    protected async update(
        id: string,
        newItem: T,
        options?: FindOneOptions<T>
    ) {
        await this.repo.update(id, newItem);
        return await this.findByID(id, options);
    }

    /**
     * Deletes item(s) of the given ID
     * @param {string|string[]} id id(s) of item
     * @returns {int} number of rows affected
     * @throws `NotFoundError` if no items are found
     */
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
