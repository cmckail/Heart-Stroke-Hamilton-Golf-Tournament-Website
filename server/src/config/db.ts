import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import NamingStrategy from "./naming-strategy";

/**
 * Sets up DB connection objects
 */

let connectionObj: ConnectionOptions = {
    type: "mysql",
    url: process.env.DB_CONNECTION,
    entities: ["src/models/*.ts"],
    namingStrategy: new NamingStrategy(),
};

if (process.env.NODE_ENV?.toLowerCase() === "development") {
    connectionObj = {
        ...connectionObj,
        type: "sqlite",
        database: "./database.db",
    };
}

if (process.env.NODE_ENV?.toLowerCase() === "sync") {
    connectionObj = {
        ...connectionObj,
        type: "sqlite",
        database: "./database.db",
        synchronize: true,
        dropSchema: true,
    };
}

if (process.env.NODE_ENV?.toLowerCase() === "test") {
    connectionObj = {
        ...connectionObj,
        type: "sqlite",
        database: ":memory:",
        dropSchema: true,
        synchronize: true,
    };
}

export default connectionObj;
