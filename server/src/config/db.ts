import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import NamingStrategy from "./naming-strategy";

/**
 * Sets up DB connection objects
 */

let connectionObj: ConnectionOptions = {
    type: "sqlite",
    database: ":memory:",
    entities: ["src/models/*.ts"],
    namingStrategy: new NamingStrategy(),
};

switch (process.env.NODE_ENV?.toLowerCase()) {
    case "development":
        connectionObj = {
            ...connectionObj,
            database: "./database.db",
        };
        break;
    case "sync":
        connectionObj = {
            ...connectionObj,
            database: "./database.db",
            synchronize: true,
            dropSchema: true,
        };
        break;
    case "test":
        connectionObj = {
            ...connectionObj,
            dropSchema: true,
            synchronize: true,
        };
        break;
    default:
        connectionObj = {
            ...connectionObj,
            type: "mysql",
            url: process.env.DB_CONNECTION,
            database: undefined,
        };
        break;
}

export default connectionObj;
